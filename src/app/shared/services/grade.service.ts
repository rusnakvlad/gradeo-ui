import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {Grade} from "../models/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  getStudentGrades(): Observable<Grade[]> {
    return this.httpClient.get<Grade[]>(this.api.grades)
  }
}
