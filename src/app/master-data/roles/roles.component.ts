import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  role: RoleUpsertModel;
  roles: RolePaged;

  selectedRoles:Role[] = [];
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  selectedSchoolId?: number;


  constructor(private roleService: RoleService, private permissionService: PermissionService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.refreshGrid();
  }

  openNew() {
    this.role = {} as RoleUpsertModel;
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


  refreshGrid() {
    this.loading = true;
    this.roleService.getPaged( DefaultPageNumber, DefaultPageSize, this.selectedSchoolId).subscribe(response => {
        this.roles = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      })
  }

  hideDialog() {
    this.showDialog=false;
    this.submitted = false;
  }

  saveContent() {
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

}
