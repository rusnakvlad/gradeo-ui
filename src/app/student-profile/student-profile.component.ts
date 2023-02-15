import {Component, OnInit} from '@angular/core';
import {StudentProfileService} from "../shared/services/student-profile.service";
import {StudentProfile} from "../shared/models/student-profile.model";
import {MasterSubject} from "../shared/models/subject.model";
import {StudyGroupService} from "../shared/services/study-group.service";
import {ChartModule} from "primeng/chart";
import {colors} from "../shared/models/colors.model";

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

  constructor(private studentService: StudentProfileService, private studyGroupService: StudyGroupService) {
  }

  ngOnInit(): void {
    this.studentService.getProfile().subscribe(response => {
      this.student = response;
      this.retrieveStudyGroupSubjects(this.student.studyGroups[0].id);
    })
  }

  retrieveStudyGroupSubjects(studyGroupId: number) {
    this.studyGroupService.getGroupSubjects(studyGroupId).subscribe(response => {
      this.subjects = response;
      this.buildChart();
    })
  }

  buildChart() {
    this.chartData = {
      labels: this.subjects.map(x => x.name),
      datasets: [
        {
          label: 'Average grade per subject',
          backgroundColor: colors,
          data: [65, 59, 80, 81, 56, 55]
        }
      ]
    };
  }
}
