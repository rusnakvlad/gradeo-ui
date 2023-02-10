import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolBasicInfo, SchoolInfo, SchoolInfoPaged, SchoolProfile} from "../models/school.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  upsert(school: SchoolInfo): Observable<any> {
    return this.httpClient.post(this.commonApi.schools, school);
  }

  delete(ids: number[]): Observable<any> {
    return this.httpClient.post(this.commonApi.schools + '/delete', {ids});
  }

  getPaged(pageNumber: number, pageSize: number): Observable<SchoolInfoPaged> {
    return this.httpClient.get<SchoolInfoPaged>(this.commonApi.schools, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize
      }
    });
  }

  getAll(): Observable<SchoolBasicInfo[]> {
    return this.httpClient.get<SchoolBasicInfo[]>(this.commonApi.schools + '/all');
  }

  getSchoolProfile():Observable<SchoolProfile>{
    return this.httpClient.get<SchoolProfile>(this.commonApi.schools + '/profile')
  }
}
