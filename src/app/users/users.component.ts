import {Component, OnInit} from '@angular/core';
import {SchoolInfo, SchoolInfoPaged} from "../shared/models/school.model";
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";

import {User, UsersPaged} from "../shared/models/user.model";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {UserService} from "../shared/services/user.service";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {UserType} from "../shared/enums/user-type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userType: UserType;
  user: User;
  selectedUsers: User[] = [];
  users?: UsersPaged;
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  userTypes:string[] = [...Object.keys(UserType), 'Other'];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize);
  }

  deleteSelected() {

  }

  deleteSingle(id: string) {

  }

  edit(user: User) {

  }

  openNew() {
    this.user = {} as User;
    this.showDialog=true;
  }

  hideDialog(){
    this.showDialog = false;
    this.submitted = false;
  }

  saveContent(){
    this.submitted = true;
    if (!this.isModelValid()) {
      return;
    }
    this.userService.create(this.user).subscribe(response => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
        this.showDialog = false;
        this.refreshGrid(DefaultPageNumber, DefaultPageSize);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'User not created', life: 3000});
      })
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.userService.getPaged(pageNumber, pageSize).subscribe(response => {
        this.users = response;
        this.loading = false;
      }
    )
  }

  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.userService.getPaged(pageNumber, pageSize).subscribe(response => {
        this.users = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }

  isModelValid(){
    if(!this.user.firstName || !this.user.lastName || !this.user.email){
      return false;
    }
    return true;
  }
}
