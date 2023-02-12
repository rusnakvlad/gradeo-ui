import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})
export class StudentGradesComponent implements OnInit {

  calendarOptions: CalendarOptions;
  constructor() { }

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      events:[
        {
          title: 'Math - 12', date:'2023-02-13',
        },
        {
          title: 'Math - 12', date:'2023-02-13',
        }
      ]
    };
  }

}
