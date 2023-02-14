import {Component, OnInit} from '@angular/core';
import {
  Grade,
  GradeCreateModel,
  GradeFilterModel,
  GradeUpdateModel,
  StudentWithGrades
} from "../shared/models/grade.model";
import {CalendarModule} from "primeng/calendar";
import {GradeService} from "../shared/services/grade.service";
import {StudyGroupBasicInfo} from "../shared/models/study-group.model";
import {MasterSubject} from "../shared/models/subject.model";
import {MasterSubjectService} from "../shared/services/master-subject.service";
import {StudyGroupService} from "../shared/services/study-group.service";
import {SpinnerService} from "../shared/services/spinner.service";

@Component({
  selector: 'app-students-grades',
  templateUrl: './students-grades.component.html',
  styleUrls: ['./students-grades.component.scss']
})
export class StudentsGradesComponent implements OnInit {

  cols: { header: string }[] = [];
  gradeCreateModel: GradeCreateModel;
  gradeUpdateModel: GradeUpdateModel;

  minDate: Date = new Date();
  maxDate: Date = new Date();
  daysRange: string[];
  showDialog: boolean = false;
  submitted: boolean = false;
  studyGroupOptions: StudyGroupBasicInfo[];
  subjectOptions: MasterSubject[];
  selectedGroupId: number;
  selectedSubjectId: number;

  studentWithGrades: StudentWithGrades[];
  selectedGrade: number;
  isEditMode: boolean;

  constructor(private gradeService: GradeService,
              private masterSubjectService: MasterSubjectService,
              private studyGroupService: StudyGroupService,
              private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() - 5);
    this.maxDate.setDate(this.maxDate.getDate() + 5);
    this.retrieveStudyGroupsOptions();
  }

  changeRange() {
    this.retrieveStudentsWithGrades();
  }

  getDaysArray(start: Date, end: Date) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  getStudentGradeForDate(grades: Grade[], date: string): Grade {
    return grades.filter(x => x.date.substring(0, 10) == date ? x : null)[0];
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

  openNew() {
    this.showDialog = true;
  }

  createGrade(studentId: number, gradeValue: number, date: string) {
    this.selectedGrade = 0;
    this.isEditMode = false;
    this.openNew();
    this.gradeCreateModel = {} as GradeCreateModel;
    this.gradeCreateModel.studentId = studentId;
    this.gradeCreateModel.subjectId = this.selectedSubjectId;
    this.gradeCreateModel.studyGroupId = this.selectedGroupId;
    this.gradeCreateModel.date = date;
  }

  editGrade(grade: Grade) {
    this.selectedGrade = grade.grade;
    this.isEditMode = true;
    this.openNew();
    this.gradeUpdateModel = {} as GradeUpdateModel;
    this.gradeUpdateModel.id = grade.id;
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.selectedGrade = 0;
  }

  saveContent() {
    if (this.isEditMode) {
      this.gradeUpdateModel.grade = this.selectedGrade;
      this.spinner.show();
      this.gradeService.update(this.gradeUpdateModel).subscribe(response => {
        this.spinner.hide();
        this.hideDialog();
        this.retrieveStudentsWithGrades()
        },
        error => {
          this.spinner.hide();
          this.hideDialog();

        });
    } else {
      this.gradeCreateModel.grade = this.selectedGrade;
      this.spinner.show()
      this.gradeService.create(this.gradeCreateModel).subscribe(response => {
          this.spinner.hide();
          this.hideDialog();
          this.retrieveStudentsWithGrades();
        },
        error => {
          this.spinner.hide();
          this.hideDialog();

        });
    }
  }

  retrieveStudyGroupsOptions() {
    this.studyGroupService.getAll().subscribe(response => {
      this.studyGroupOptions = response;
      this.retrieveSubjectOptions(this.studyGroupOptions[0].id)
    })
  }

  retrieveSubjectOptions(subjectId: number) {
    this.studyGroupService.getGroupSubjects(subjectId).subscribe(response => {
      this.subjectOptions = response;
      this.selectedSubjectId = this.subjectOptions[0].id;
      this.retrieveStudentsWithGrades();
    })
  }

  onChangeStudyGroup() {
    this.retrieveSubjectOptions(this.selectedGroupId);
  }

  onChangeSubject(){
    this.retrieveStudentsWithGrades();
}
  retrieveStudentsWithGrades() {

    let filterModel = {} as GradeFilterModel;
    filterModel.studyGroupId = this.selectedGroupId;
    filterModel.subjectId = this.selectedSubjectId;
    filterModel.startDate = this.minDate;
    filterModel.endDate = this.maxDate;
    this.spinner.show();
    this.gradeService.getStudentsWithGrades(filterModel).subscribe(response => {
      this.studentWithGrades = response;
      this.setTableContent();
      this.spinner.hide();
    })
  }

}
