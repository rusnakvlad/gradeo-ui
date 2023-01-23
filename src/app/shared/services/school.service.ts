import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolInfo} from "../models/school.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  getOrganizations(): Observable<SchoolInfo[]> {
    return this.httpClient.get<SchoolInfo[]>(this.commonApi.schools);
  }
}
