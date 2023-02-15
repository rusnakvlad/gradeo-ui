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

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.setStudentsPerGroupData()
  }

  setStudentsPerGroupData() {
    this.statisticsService.getStudentsCountPerStudyGroup().subscribe(response => {
      this.studentsPerGroupData = response;
      this.buildStudentsPerGroupChart();
    })
  }
  buildStudentsPerGroupChart(){
    this.studentsPerGroupChart = {
      labels: this.studentsPerGroupData.map(x => x.label),
      datasets: [
        {
          data: this.studentsPerGroupData.map(x => x.value),
          backgroundColor: ChartColors,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }
}
