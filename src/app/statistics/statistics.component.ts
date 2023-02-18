import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "../shared/services/statistics.service";
import {ChartModel} from "../shared/models/chart.model";
import {ChartColors} from "../shared/constants/colors";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  studentsPerGroupChart: any;
  studentsPerGroupData: ChartModel[];


  averageGradePerGroupChart: any;
  averageGradePerGroupData: ChartModel[];


  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.setStudentsPerGroupData();
    this.setAverageGradePerStudyGroup();
  }

  setStudentsPerGroupData() {
    this.statisticsService.getStudentsCountPerStudyGroup().subscribe(response => {
      this.studentsPerGroupData = response;
      this.studentsPerGroupChart = this.getChart(this.studentsPerGroupData);
    })
  }

  setAverageGradePerStudyGroup() {
    this.statisticsService.getAverageGradePerStudyGroup().subscribe(response => {
      this.averageGradePerGroupData = response.sort((x,y) => x.value - y.value);
      this.averageGradePerGroupChart = this.getChart(this.averageGradePerGroupData, 'Average grade per group');
    })
  }

  getChart(chartData: ChartModel[], label: string = ''): any {
    if(label){
      return {
        labels: chartData.map(x => x.label),
        datasets: [
          {
            label: label,
            data: chartData.map(x => x.value),
            backgroundColor: ChartColors,
            tension: .4
          }
        ]
      };
    }
    return {
      labels: chartData.map(x => x.label),
      datasets: [
        {
          data: chartData.map(x => x.value),
          backgroundColor: ChartColors,
          tension: .4
        }
      ]
    };
  }
}
