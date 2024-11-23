import { Component, OnInit } from '@angular/core';
import { GradePredictionModel } from "../shared/models/grade.model";
import { AnalyticsService } from "../shared/services/analytics.service";
import { OptionService } from '../shared/services/option.service';
import { DictionaryOptionType } from '../shared/models/option.model';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  genderOptions: string[];
  ethnicityOptions: string[];
  parentLevelEducationOptions: string[];
  lunchOptions: string[];
  testPreparationCourseOptions: string[];

  predictionRequest: GradePredictionModel = {} as GradePredictionModel;
  prediction: number;

  warningMessage: Message[] = [
    { severity: 'info',
      summary: 'Info',
      detail: "Please note that our service provides a prediction of a student's next grade based on historical data and machine learning algorithms. While we strive to provide accurate predictions, our service cannot guarantee a 100% accuracy rate. Use for primary school basic disciplines" }
    ]

  constructor(private analyticsService: AnalyticsService, private optionService: OptionService) {
  }

  ngOnInit(): void {
    this.retrieveProfileOptions();
  }

  getPrediction() {

    if (this.isModelValid(this.predictionRequest)) {
      let request = {...this.predictionRequest};
      request.writing_score = this.convertToPercentage(this.predictionRequest.writing_score);
      request.reading_score = this.convertToPercentage(this.predictionRequest.reading_score);

      this.analyticsService.getGradePrediction(request).subscribe(response => {
        this.prediction = this.convertToScale(response.prediction)
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

  retrieveProfileOptions() {
    this.optionService.getAll().subscribe(response => {
      this.genderOptions = response.filter(x => x.optionType == DictionaryOptionType.Gender).map(x => x.optionValue);
      this.ethnicityOptions = response.filter(x => x.optionType == DictionaryOptionType.Ethnicity).map(x => x.optionValue);
      this.parentLevelEducationOptions = response.filter(x => x.optionType == DictionaryOptionType.ParentalLevelOfEducation).map(x => x.optionValue);
      this.lunchOptions = response.filter(x => x.optionType == DictionaryOptionType.Lunch).map(x => x.optionValue);
      this.testPreparationCourseOptions = response.filter(x => x.optionType == DictionaryOptionType.TestPreparationCourse).map(x => x.optionValue);
    })
  }

  convertToScale(value: number): number {
    if (value < 0 || value > 100) {
      throw new Error("Value must be between 0 and 100.");
    }
    
    return parseFloat(((value / 100) * 12).toFixed(2)); // For 2 decimal places
  }

  convertToPercentage(value: number): number {
    if (value < 0 || value > 12) {
      throw new Error("Value must be between 0 and 12.");
    }
    return (value / 12) * 100;
  }
}
