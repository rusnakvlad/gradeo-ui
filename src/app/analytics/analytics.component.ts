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

  genderOptions:string[] = ['male', 'female']
  ethnicityOptions: string[] = ['group A', 'group B', 'group C', 'group D', 'group E']
  parentLevelEducationOptions: string[] = ["associate's degree", "bachelor's degree", "high school", "master's degree", "some college", "some high school"]
  lunchOptions: string[] = ["free/reduced", "standard"]
  testPreparationCourseOptions: string[] = ["none", "completed"]

  predictionRequest: GradePredictionModel = {} as GradePredictionModel;
  prediction: number;

  warningMessage: string = "Please note that our service provides a prediction of a student's next grade based on historical data and machine learning algorithms. While we strive to provide accurate predictions, our service cannot guarantee a 100% accuracy rate. Additionally, please do not use this service as the sole factor in determining a student's academic progress or future. Our prediction is intended to provide additional insight and should be used in conjunction with other factors, such as the student's current academic performance, teacher evaluations, and personal circumstances. Thank you for understanding.";

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
  }

  getPrediction() {

    if (this.isModelValid(this.predictionRequest)) {

      this.analyticsService.getGradePrediction(this.predictionRequest).subscribe(response => {
        this.prediction = response.prediction
      })
    }
  }

  isModelValid(model: GradePredictionModel): boolean {
    return model.gender != null &&
         model.ethnicity != null &&
         model.parental_level_of_education != null &&
         model.lunch != null &&
         model.test_preparation_course != null &&
         model.reading_score != null && !isNaN(model.reading_score) &&
         model.writing_score != null && !isNaN(model.writing_score);
  }

}
