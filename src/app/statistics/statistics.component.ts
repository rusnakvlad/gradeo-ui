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


  averageGradePerSubjectChart: any;
  averageGradePerSubjectData: ChartModel[];

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.setStudentsPerGroupData();
    this.setAverageGradePerStudyGroup();
    this.setAverageGradePerSubject();
  }

  setStudentsPerGroupData() {
    this.statisticsService.getStudentsCountPerStudyGroup().subscribe(response => {
      this.studentsPerGroupData = response;
      this.studentsPerGroupChart = this.getChart(this.studentsPerGroupData);
    })
  }

  setAverageGradePerStudyGroup() {
    this.statisticsService.getAverageGradePerStudyGroup().subscribe(response => {
      this.averageGradePerGroupData = response;
      this.averageGradePerGroupChart = this.getChart(this.averageGradePerGroupData, 'Average grade per group');
    })
  }

  setAverageGradePerSubject() {
    this.statisticsService.getAverageGradePerSubject().subscribe(response => {
      this.averageGradePerSubjectData = response;
      this.averageGradePerSubjectChart = this.getRadarChart(this.averageGradePerSubjectData);
    })
  }

  getChart(chartData: ChartModel[], label: string = ''): any {
    if (label) {
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

  getRadarChart(chartData: ChartModel[]): any {
    return {
      labels: chartData.map(x => x.label),
      datasets: [
        {
          label: 'Average grades per subject',
          data: chartData.map(x => x.value),
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)'
        }
      ]
    };
  }
}
