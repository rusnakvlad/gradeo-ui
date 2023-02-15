import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {BarChartModel} from "../models/chart.model";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  getCurrentStudentAverageGrades(): Observable<BarChartModel[]> {
    return this.httpClient.get<BarChartModel[]>(this.api.statistics);
  }

}
