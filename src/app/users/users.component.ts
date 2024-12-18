import {Component, OnInit} from '@angular/core';
import {SchoolBasicInfo, SchoolInfo, SchoolInfoPaged} from "../shared/models/school.model";
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";

import {CreateUserModel, UpdateUserModel, User, UserDetails, UsersPaged} from "../shared/models/user.model";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {UserService} from "../shared/services/user.service";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {UserType} from "../shared/enums/user-type";
import {HttpErrorResponse} from "@angular/common/http";
import {SchoolService} from "../shared/services/school.service";
import {RoleBasicInfo} from "../shared/models/role.model";
import {RoleService} from "../shared/services/role.service";
import {UserAuthService} from "../shared/services/user-auth.service";
import {SpinnerService} from "../shared/services/spinner.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userType: string;
  user: User;
  selectedUsers: User[] = [];
  users?: UsersPaged;
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  userTypes: string[] = [...Object.keys(UserType), 'Other'];
  schoolsOptions: SchoolBasicInfo[];
  selectedSchoolId?: number;
  rolesOptions: RoleBasicInfo[];
  selectedRoles: number[];
  currentUser: UserDetails;
  editMode: boolean;

  constructor(
    private userService: UserService,
    private schoolService: SchoolService,
    private messageService: MessageService,
    private roleService: RoleService,
    private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.refreshGrid(DefaultPageNumber, DefaultPageSize);
  }

  deleteSelected() {

  }

  deleteSingle(id: string) {

  }

  edit(user: User) {
    this.user = user;
    this.selectedRoles = user.roleIds;
    this.retrieveRoles();
    this.showDialog = true;
    this.editMode = true;
  }

  openNew() {
    this.user = {} as User;
    this.retrieveRoles();
    this.showDialog = true;
    this.editMode=false;
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.editMode=false;
  }

  saveContent() {
    this.submitted = true;
    if (!this.isModelValid()) {
      return;
    }
    this.user.userType = this.userType == 'Other' ? '' : this.userType;
    if (!this.user.id) {
      let createUserModel = {} as CreateUserModel;
      createUserModel.userMetadata = this.user;
      createUserModel.roleIds = this.selectedRoles;
      createUserModel.businessUnitId = this.selectedSchoolId;
      this.spinner.show();
      this.userService.create(createUserModel, this.selectedSchoolId).subscribe(response => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
          this.showDialog = false;
          this.spinner.hide();
          this.refreshGrid(DefaultPageNumber, DefaultPageSize);
        },
        (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'User not created', life: 3000});
        })
    } else {
      let updateUserModel = {} as UpdateUserModel;
      updateUserModel.userId = this.user.id;
      updateUserModel.firstName = this.user.firstName;
      updateUserModel.lastName = this.user.lastName;
      updateUserModel.roleIds = this.selectedRoles;
      this.spinner.show();
      this.userService.update(updateUserModel).subscribe(response => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
          this.showDialog = false;
          this.spinner.hide();
          this.editMode=false;
          this.refreshGrid(DefaultPageNumber, DefaultPageSize);
        },
        (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'User not created', life: 3000});
        })
    }
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.userService.getPaged(pageNumber, pageSize, this.selectedSchoolId).subscribe(response => {
        this.users = response;
        this.loading = false;
      }
    )
  }

  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.userService.getPaged(pageNumber, pageSize, this.selectedSchoolId).subscribe(response => {
        this.users = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }

  retrieveSchools() {
    this.schoolService.getAll().subscribe(response => {
        this.schoolsOptions = [{name: 'System', id: 0}, ...response];
      },
      error => {

      })
  }

  setCurrentUser() {
    this.userService.getCurrentUser().subscribe(response => {
      this.currentUser = response;
      if (this.currentUser.systemType == 1) {
        this.retrieveSchools();
      }
    })
  }

  isModelValid() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email) {
      return false;
    }
    return true;
  }

  schoolChanged() {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize);
  }

  retrieveRoles() {
    this.roleService.getAll(this.selectedSchoolId).subscribe(response => {
      this.rolesOptions = response;
    })
  }
}
