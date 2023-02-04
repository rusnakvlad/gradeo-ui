import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {RoleCreateModel, RolePaged} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  getPaged(businessUnitId: number, pageNumber: number, pageSize: number): Observable<RolePaged> {
    return this.httpClient.get<RolePaged>(this.commonApi.roles);
  }

  create(role: RoleCreateModel): Observable<any> {
    return this.httpClient.post(this.commonApi.roles, role);
  }
}
