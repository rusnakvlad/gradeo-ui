import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {
  DateRangeFilter,
  Grade,
  GradeCreateModel,
  GradeFilterModel,
  GradeUpdateModel,
  StudentWithGrades
} from "../models/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  getStudentGrades(filter: DateRangeFilter): Observable<Grade[]> {
    return this.httpClient.post<Grade[]>(this.api.grades + '/currentStudentGrades', filter);
  }

  create(grade: GradeCreateModel): Observable<any> {
    return this.httpClient.post(this.api.grades, grade);
  }

  update(grade: GradeUpdateModel): Observable<any> {
    return this.httpClient.put(this.api.grades, grade);
  }

  getStudentsWithGrades(gradesFilter: GradeFilterModel): Observable<StudentWithGrades[]> {
    return this.httpClient.post<StudentWithGrades[]>(this.api.grades + '/filtered', gradesFilter);
  }
}
