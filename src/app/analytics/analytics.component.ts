import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {ToggleButtonModule} from "primeng/togglebutton";
import {GradePredictionModel} from "../shared/models/grade.model";
import {AnalyticsService} from "../shared/services/analytics.service";
import {MessageModule} from "primeng/message";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  predictionRequest: GradePredictionModel = {} as GradePredictionModel;
  prediction: number;
  submited: boolean;

  g1: number;
  g2: number;

  warningMessage: string = "Please note that our service provides a prediction of a student's next grade based on historical data and machine learning algorithms. While we strive to provide accurate predictions, our service cannot guarantee a 100% accuracy rate. Additionally, please do not use this service as the sole factor in determining a student's academic progress or future. Our prediction is intended to provide additional insight and should be used in conjunction with other factors, such as the student's current academic performance, teacher evaluations, and personal circumstances. Thank you for understanding.";

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.predictionRequest.higher = false;
  }

  getPrediction() {
    this.submited = true;
    const maxStandartGrade = 12;
    const maxAnalyzedGrade = 20;

    if (this.isModelValid()) {
      let percenatgeG1 = this.g1 / maxStandartGrade;
      let percenatgeG2 = this.g2 / maxStandartGrade;
      this.predictionRequest.g1 = percenatgeG1 * maxAnalyzedGrade;
      this.predictionRequest.g2 = percenatgeG2 * maxAnalyzedGrade;

      this.analyticsService.getGradePrediction(this.predictionRequest).subscribe(response => {
        let percenatgeResponse = response.prediction / maxAnalyzedGrade;
        this.prediction = percenatgeResponse * maxStandartGrade;
        this.submited = false;
      })
    }
  }

  isModelValid(): boolean {
    if (this.predictionRequest.failures == undefined || this.predictionRequest.failures == null ||
      this.predictionRequest.medu == undefined || this.predictionRequest.medu == null ||
      this.predictionRequest.studyTime == undefined || this.predictionRequest.studyTime == null ||
      this.predictionRequest.absences == undefined || this.predictionRequest.absences == null ||
      this.g1 == undefined || this.g1 == null ||
      this.g2 == undefined || this.g2 == null ||
      this.predictionRequest.higher == undefined || this.predictionRequest.higher == null) {
      return false;
    }
    return true;
  }

}
