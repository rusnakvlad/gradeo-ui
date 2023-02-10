import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {StudentProfileCreateModel, StudentProfilePaged} from "../models/student-profile.model";

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) { }

  get(): Observable<StudentProfilePaged>{
    return this.httpClient.get<StudentProfilePaged>(this.api.studentProfiles)
  }

  create(studentProfile: StudentProfileCreateModel): Observable<any>{
    return this.httpClient.post(this.api.studentProfiles, studentProfile);
  }
}
