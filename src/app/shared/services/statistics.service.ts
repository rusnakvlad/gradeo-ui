import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {ChartModel} from "../models/chart.model";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  getCurrentStudentAverageGrades(): Observable<ChartModel[]> {
    return this.httpClient.get<ChartModel[]>(this.api.statistics + '/studentAverageGradePerSubject');
  }

  getStudentsCountPerStudyGroup(): Observable<ChartModel[]> {
    return this.httpClient.get<ChartModel[]>(this.api.statistics + '/studentsPerGroup');
  }

}
