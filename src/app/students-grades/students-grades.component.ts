import {Component, OnInit} from '@angular/core';
import {Grade, StudentWithGrades} from "../shared/models/grade.model";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-students-grades',
  templateUrl: './students-grades.component.html',
  styleUrls: ['./students-grades.component.scss']
})
export class StudentsGradesComponent implements OnInit {

  cols: { header: string }[] = [];

  minDate: Date = new Date();
  maxDate: Date = new Date();
  daysRange: string[];
  studentWithGrades: StudentWithGrades[] = [
    {
      studentId: 1,
      studentFirstName: "Jon",
      studentLastName: "Brox",
      grades: [{
        id: '2aeeeead-334343-dfdgadss-444ggfdfd',
        grade: 12,
        subjectName: 'Math',
        subjectId: 1,
        date: '2023-02-13',
        studentId: 1,

      },
        {
          id: '2aeeeead-334343-dfdg444s-444ggfdfd',
          grade: 12,
          subjectName: 'PE',
          subjectId: 1,
          date: '2023-02-14',
          studentId: 1,

        }]
    },
    {
      studentId: 1,
      studentFirstName: "Jon",
      studentLastName: "Brox",
      grades: [{
        id: '2aeeeead-334343-dfdgadss-444ggfdfd',
        grade: 12,
        subjectName: 'Math',
        subjectId: 1,
        date: '2023-02-13',
        studentId: 1,

      }]
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() - 5);
    this.maxDate.setDate(this.maxDate.getDate() + 5);
    this.setTableContent();
  }

  changeRange() {
    this.setTableContent();
  }

  getDaysArray(start: Date, end: Date) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  getStudentGradeForDate(grades: Grade[], date: string): number {
    return grades.filter(x => x.date == date ? x : null)[0]?.grade;
  }

  setTableContent() {
    let daysDateRange = this.getDaysArray(this.minDate, this.maxDate);
    this.daysRange = daysDateRange.map((x) => x.toISOString().slice(0, 10));

    let definedCols = [{header: 'Student'}]
    let dateCols = this.daysRange.map(x => {
      return {header: x}
    })
    this.cols = [...definedCols, ...dateCols]
  }

  createGrade(studentId: number, gradeValue: number, date: string) {
    alert(studentId + ' ' + gradeValue + ' ' + ' ' + date)
  }

}
