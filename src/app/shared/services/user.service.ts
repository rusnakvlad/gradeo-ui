import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UsersPaged} from "../models/user.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }
  getPaged(pageNumber: number, pageSize: number, schoolId: string): Observable<UsersPaged> {
    return this.httpClient.get<UsersPaged>(this.api.users, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        schoolId: schoolId,
      }
    });
  }

  create(user: User, schoolId?: number){
    return this.httpClient.post(this.api.users, {
      userMetadata:user,
      businessUnitId:schoolId,
    })
  }
}
