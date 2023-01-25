import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolInfoPaged} from "../models/school.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  getOrganizations(pageNumber: number, pageSize: number): Observable<SchoolInfoPaged> {
    return this.httpClient.get<SchoolInfoPaged>(this.commonApi.schools, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize
      }
    });
  }
}
