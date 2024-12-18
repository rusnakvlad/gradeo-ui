import { Component, OnInit } from '@angular/core';
import {StudentProfile, StudentProfileUpsertModel, StudentProfilePaged} from "../shared/models/student-profile.model";
import {PopupService} from "../shared/services/popup.service";
import {StudentProfileService} from "../shared/services/student-profile.service";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {StudyGroupBasicInfo} from "../shared/models/study-group.model";
import {StudyGroupService} from "../shared/services/study-group.service";
import {UserService} from "../shared/services/user.service";
import {UserType} from "../shared/enums/user-type";
import {SpinnerService} from "../shared/services/spinner.service";
import { OptionService } from '../shared/services/option.service';
import { DictionaryOptionType } from '../shared/models/option.model';

@Component({
  selector: 'app-student-profiles',
  templateUrl: './student-profiles.component.html',
  styleUrls: ['./student-profiles.component.scss']
})
export class StudentProfilesComponent implements OnInit {

  student: StudentProfileUpsertModel;
  students?: StudentProfilePaged;
  selectedStudents: StudentProfile[] = [];
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  studyGroupOptions: StudyGroupBasicInfo[];
  userEmailOptions: string[];
  isEditMode: boolean = false;

  genderOptions:string[];
  ethnicityOptions: string[];
  parentLevelEducationOptions: string[];
  lunchOptions: string[];
  testPreparationCourseOptions: string[];

  constructor(private popupService: PopupService,
              private studentService: StudentProfileService,
              private studyGroupService: StudyGroupService,
              private userService: UserService,
              private spinner: SpinnerService,
              private optionService: OptionService) { }

  ngOnInit(): void {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize)
  }

  openNew() {
    this.retrieveStudyGroups();
    this.getStudentsEmails();
    this.retrieveProfileOptions();
    this.student = {} as StudentProfileUpsertModel;
    this.showDialog = true;
  }

  edit(studentProfile: StudentProfile) {
    this.isEditMode=true;
    this.student = {} as StudentProfileUpsertModel;
    this.student.userEmail = studentProfile.email;
    this.student.studyGroupId = studentProfile.studyGroups[0].id;
    this.student.id = studentProfile.id;
    this.student.gender = studentProfile.gender;
    this.student.ethnicity = studentProfile.ethnicity;
    this.student.parentalLevelOfEducation = studentProfile.parentalLevelOfEducation;
    this.student.lunch = studentProfile.lunch;
    this.student.testPreparationCourse = studentProfile.testPreparationCourse;
    
    this.retrieveStudyGroups();
    this.retrieveProfileOptions();
    this.showDialog = true;
  }

  deleteSingle(id: number) {

  }

  deleteSelected() {

  }


  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.studentService.get(pageNumber, pageSize).subscribe(response => {
        this.students = response;
        console.log(this.students);
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.popupService.error(error.Message)
      })
  }

  hideDialog() {
    this.showDialog = false;
    this.isEditMode = false;
    this.submitted = false;
  }

  saveContent() {
    this.spinner.show();
    this.studentService.upsert(this.student).subscribe(response => {
        this.popupService.success('Student Profile Created');
        this.refreshGrid(DefaultPageNumber, DefaultPageSize);
        this.hideDialog();
        this.spinner.hide();
      },
      error => {
        this.popupService.error('Student Profile was not created');
        this.spinner.hide();
      })

  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.studentService.get(pageNumber, pageSize).subscribe(response => {
        this.students = response;
        this.loading = false;
      }
    )
  }

  retrieveStudyGroups(){
    this.studyGroupService.getAll().subscribe(response => {
      this.studyGroupOptions = response;
    })
  }

  getStudentsEmails() {
    this.userService.getFilteredEmails("", UserType.Student).subscribe(response => {
      this.userEmailOptions = response;
    })
  }

  retrieveProfileOptions(){
    this.optionService.getAll().subscribe(response => {
      this.genderOptions = response.filter(x => x.optionType == DictionaryOptionType.Gender).map(x => x.optionValue);
      this.ethnicityOptions = response.filter(x => x.optionType == DictionaryOptionType.Ethnicity).map(x => x.optionValue);
      this.parentLevelEducationOptions = response.filter(x => x.optionType == DictionaryOptionType.ParentalLevelOfEducation).map(x => x.optionValue);
      this.lunchOptions = response.filter(x => x.optionType == DictionaryOptionType.Lunch).map(x => x.optionValue);
      this.testPreparationCourseOptions = response.filter(x => x.optionType == DictionaryOptionType.TestPreparationCourse).map(x => x.optionValue);
    })
  }
}
