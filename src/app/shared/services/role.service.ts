import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {RoleUpsertModel, RolePaged, RoleBasicInfo} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  getPaged(pageNumber: number, pageSize: number, businessUnitId?: number): Observable<RolePaged> {
    let params = new HttpParams({
      fromObject: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      }
    });
    if (businessUnitId) {
      params = params.set('schoolId', businessUnitId);
    }

    return this.httpClient.get<RolePaged>(this.commonApi.roles, {params: params});
  }

  getAll(businessUnitId?: number): Observable<RoleBasicInfo[]> {
    return this.httpClient.get<RoleBasicInfo[]>(this.commonApi.roles + '/all', {
      params: {
        schoolId: businessUnitId?.toString() || "",
      }
    });
  }

  upsert(role: RoleUpsertModel): Observable<any> {
    return this.httpClient.post(this.commonApi.roles, role);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.commonApi.roles + '/' + id);
  }
}
