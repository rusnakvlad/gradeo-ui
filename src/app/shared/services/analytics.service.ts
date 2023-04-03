import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {DateRangeFilter, Grade, GradePredictionModel} from "../models/grade.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private httpClient: HttpClient) {
  }

  getGradePrediction(predictionRequest: GradePredictionModel): Observable<{ prediction: number }> {
    return this.httpClient.post<{ prediction: number }>('http://127.0.0.1:5000/predict', predictionRequest);
  }
}
