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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userType: UserType;
  user?: User;
  selectedUsers: User[] = [];
  users?: UsersPaged;
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;

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
}
