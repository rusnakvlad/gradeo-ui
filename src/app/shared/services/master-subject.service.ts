import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MasterSubject} from "../models/subject.model";
import {CommonApiService} from "./common-api.service";

@Injectable({
  providedIn: 'root'
})
export class MasterSubjectService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  get(): Observable<MasterSubject[]> {
    return this.httpClient.get<MasterSubject[]>(this.commonApi.masterSubjects);
  }

  upsert(masterSubject: MasterSubject): Observable<any> {
    return this.httpClient.post(this.commonApi.masterSubjects, masterSubject);
  }
}
