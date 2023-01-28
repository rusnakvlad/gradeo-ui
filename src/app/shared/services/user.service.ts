import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsersPaged} from "../models/user.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }
  getPaged(pageNumber: number, pageSize: number): Observable<UsersPaged> {
    return this.httpClient.get<UsersPaged>(this.api.users, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize
      }
    });
  }
}
