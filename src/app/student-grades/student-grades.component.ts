import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {GradeService} from "../shared/services/grade.service";
import {formatDate} from "@angular/common";
import {SpinnerService} from "../shared/services/spinner.service";
import {DateRangeFilter} from "../shared/models/grade.model";

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

    const date = new Date();
    let dateRangeFilter = {} as DateRangeFilter;
    dateRangeFilter.startDate = this.getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    dateRangeFilter.endDate = this.getLastDayOfMonth(date.getFullYear(), date.getMonth());

    this.spinner.show();
    this.gradeService.getStudentGrades(dateRangeFilter).subscribe(response => {
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

  getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }
}
