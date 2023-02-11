import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {TeacherProfileUpsertModel, TeacherProfilePaged} from "../models/teacher-profile.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  get(pageNumber: number, pageSize: number): Observable<TeacherProfilePaged> {
    return this.httpClient.get<TeacherProfilePaged>(this.api.teacherProfiles)
  }

  upsert(teacherProfile: TeacherProfileUpsertModel): Observable<any> {
    return this.httpClient.post(this.api.teacherProfiles, teacherProfile);
  }
}
