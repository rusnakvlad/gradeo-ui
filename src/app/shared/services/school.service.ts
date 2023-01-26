import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolInfo, SchoolInfoPaged} from "../models/school.model";
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
}
