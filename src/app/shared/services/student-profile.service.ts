import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {
  StudentProfilePaged,
  StudentProfileUpsertModel
} from "../models/student-profile.model";

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  get(pageNumber: number, pageSize: number): Observable<StudentProfilePaged> {
    return this.httpClient.get<StudentProfilePaged>(this.api.studentProfiles)
  }

  upsert(studentProfile: StudentProfileUpsertModel): Observable<any> {
    return this.httpClient.post(this.api.studentProfiles, studentProfile);
  }
}
