import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {GradeService} from "../shared/services/grade.service";
import {formatDate} from "@angular/common";
import {SpinnerService} from "../shared/services/spinner.service";

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})
export class StudentGradesComponent implements OnInit {

  calendarOptions: CalendarOptions;
  events: { title: string, date: string }[]

  constructor(private gradeService: GradeService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {

    this.calendarOptions = {
      plugins: [dayGridPlugin]
    };

    this.spinner.show();
    this.gradeService.getStudentGrades().subscribe(response => {
        console.log(response);
        this.events = response.map(x => {
          return {
            title: x.subjectName + ' - ' + x.grade,
            date: x.date.substring(0, 10)
          }
        });
        this.calendarOptions.events = this.events
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      })
  }
}
