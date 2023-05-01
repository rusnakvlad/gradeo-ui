import {Component, OnInit} from '@angular/core';
import {StudentProfileService} from "../shared/services/student-profile.service";
import {StudentProfile} from "../shared/models/student-profile.model";
import {MasterSubject} from "../shared/models/subject.model";
import {StudyGroupService} from "../shared/services/study-group.service";
import {ChartModule} from "primeng/chart";
import {StatisticsService} from "../shared/services/statistics.service";
import {SpinnerService} from "../shared/services/spinner.service";
import {ChartModel} from "../shared/models/chart.model";
import {ChartColors} from "../shared/constants/colors";
import {PopupService} from "../shared/services/popup.service";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  student?: StudentProfile;
  subjects: MasterSubject[];

  chartData: any;
  chartOptions: any;
  averageGrades: ChartModel[];

  constructor(private studentService: StudentProfileService,
              private popupService: PopupService,
              private studyGroupService: StudyGroupService,
              private statisticsService: StatisticsService,
              private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.studentService.getProfile().subscribe(response => {
      this.student = response;
      this.retrieveStudyGroupSubjects(this.student.studyGroups[0].id);
    })
    this.retrieveAverageGrades();
  }

  retrieveStudyGroupSubjects(studyGroupId: number) {
    this.studyGroupService.getGroupSubjects(studyGroupId).subscribe(response => {
      this.subjects = response;
      this.buildChart();
    },
      error => {
        this.popupService.error(error.error.Message)
      })
  }

  retrieveAverageGrades(){
    this.spinner.show();
    this.statisticsService.getCurrentStudentAverageGrades().subscribe(response => {
    this.averageGrades = response;
    this.buildChart();
    this.spinner.hide();
    },
      error => {
        this.popupService.error(error.error.Message)
      })
  }

  buildChart() {
    this.chartData = {
      labels: this.averageGrades.map(x => x.label),
      datasets: [
        {
          label: 'Average grade per subject',
          backgroundColor: ChartColors,
          data: this.averageGrades.map(x => x.value)
        }
      ]
    };
  }
}
