import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateUserModel, User, UserDetails, UsersPaged} from "../models/user.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  getPaged(pageNumber: number, pageSize: number, schoolId?: number): Observable<UsersPaged> {
    let params = new HttpParams({
      fromObject: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      }
    });
    if (schoolId) {
      params = params.set('schoolId', schoolId);
    }

    return this.httpClient.get<UsersPaged>(this.api.users, {params: params});
  }

  create(user: CreateUserModel, schoolId?: number) {
    return this.httpClient.post(this.api.users, user)
  }

  getCurrentUser(): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(this.api.users + '/currentUser');
  }
}
