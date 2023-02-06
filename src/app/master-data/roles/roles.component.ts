import {Component, OnInit} from '@angular/core';
import {Role, RolePaged, RoleUpsertModel} from "../../shared/models/role.model";
import {RoleService} from "../../shared/services/role.service";
import {PermissionService} from "../../shared/services/permission.service";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {MasterSubject} from "../../shared/models/subject.model";
import {HttpErrorResponse} from "@angular/common/http";
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";

import {DefaultPageNumber, DefaultPageSize} from "../../shared/models/pagination.model";
import {SchoolBasicInfo} from "../../shared/models/school.model";
import {SchoolService} from "../../shared/services/school.service";
import {PopupService} from "../../shared/services/popup.service";
import {Permission} from "../../shared/models/permission.model";
import {UserService} from "../../shared/services/user.service";
import {UserDetails} from "../../shared/models/user.model";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  role: RoleUpsertModel;
  roles?: RolePaged;

  selectedRoles: Role[] = [];
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  selectedSchoolId?: number;
  schoolsOptions: SchoolBasicInfo[];
  permissionOptions: Permission[];
  selectedPermissions: number[];
  currentUser: UserDetails;

  constructor(private roleService: RoleService,
              private permissionService: PermissionService,
              private schoolService: SchoolService,
              private popupService: PopupService,
              private userService: UserService) {
  }


  ngOnInit(): void {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize);
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.userService.getCurrentUser().subscribe(response => {
      this.currentUser = response;
      if(this.currentUser.systemType == 1){
        this.retrieveSchools();
      }
    })
  }

  openNew() {
    this.role = {} as RoleUpsertModel;
    this.retrievePermissions();
    this.showDialog = true;
  }

  edit(role: Role) {
    this.openNew();
    this.role.id = role.id;
    this.role.roleName = role.roleName;
    this.role.permissions = role.permissions.map(x => x.permissionId);
    this.role.businessUnitId = role.businessUnitId;
  }

  deleteSingle(id: number) {

  }

  deleteSelected() {

  }


  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.roleService.getPaged(pageNumber, pageSize, this.selectedSchoolId).subscribe(response => {
        this.roles = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      })
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
  }

  saveContent() {
    if (!this.role.id) {
      this.role.permissions = this.selectedPermissions;
      this.roleService.create(this.role).subscribe(response => {
          this.popupService.success('Role Created');
          this.refreshGrid(DefaultPageNumber, DefaultPageSize);
        },
        error => {
          this.popupService.error('Role was not created');
        })
    }
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.roleService.getPaged(pageNumber, pageSize, this.selectedSchoolId).subscribe(response => {
        this.roles = response;
        this.loading = false;
      }
    )
  }

  schoolChanged() {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize);
  }

  retrieveSchools() {
    this.schoolService.getAll().subscribe(response => {
        this.schoolsOptions = [{name: 'System', id: 0}, ...response];
      },
      error => {

      })
  }

  retrievePermissions() {
    this.permissionService.get().subscribe(response => {
      this.permissionOptions = response;
    })
  }

}
