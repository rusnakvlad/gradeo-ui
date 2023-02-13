import {Component, OnInit} from '@angular/core';
import {StudyGroupBasicInfo} from "../shared/models/study-group.model";
import {PopupService} from "../shared/services/popup.service";
import {StudyGroupService} from "../shared/services/study-group.service";
import {UserService} from "../shared/services/user.service";
import {SpinnerService} from "../shared/services/spinner.service";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {LazyLoadEvent} from "primeng/api";
import {UserType} from "../shared/enums/user-type";
import {TeacherProfile, TeacherProfileUpsertModel, TeacherProfilePaged} from "../shared/models/teacher-profile.model";
import {TeacherProfileService} from "../shared/services/teacher-profile.service";
import {MasterSubject} from "../shared/models/subject.model";
import {MasterSubjectService} from "../shared/services/master-subject.service";

@Component({
  selector: 'app-teacher-profiles',
  templateUrl: './teacher-profiles.component.html',
  styleUrls: ['./teacher-profiles.component.scss']
})
export class TeacherProfilesComponent implements OnInit {

  teacher: TeacherProfileUpsertModel;
  teachers?: TeacherProfilePaged;
  selectedTeachers: TeacherProfile[] = [];
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  studyGroupOptions: StudyGroupBasicInfo[];
  subjectOptions: MasterSubject[];
  userEmailOptions: string[];
  isEditMode: boolean = false;

  constructor(private popupService: PopupService,
              private teacherService: TeacherProfileService,
              private studyGroupService: StudyGroupService,
              private masterSubjectService: MasterSubjectService,
              private userService: UserService,
              private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize)
  }

  openNew() {
    this.retrieveStudyGroups();
    this.retrieveMasterSubjects();
    this.getTeachersEmails();
    this.teacher = {} as TeacherProfileUpsertModel;
    this.showDialog = true;
  }

  edit(teacherProfile: TeacherProfile) {
    this.retrieveStudyGroups();
    this.retrieveMasterSubjects();
    this.isEditMode = true;
    this.teacher = {} as TeacherProfileUpsertModel;
    this.teacher.userEmail = teacherProfile.email;
    this.teacher.studyGroupIds = teacherProfile.studyGroups.map(x => x.id);
    this.teacher.subjectIds = teacherProfile.subjects.map(x => x.id);
    this.teacher.id = teacherProfile.id;
    this.showDialog = true;
  }

  deleteSingle(id: number) {

  }

  deleteSelected() {

  }


  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.teacherService.get(pageNumber, pageSize).subscribe(response => {
        this.teachers = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      })
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.isEditMode = false;
  }

  saveContent() {
    this.spinner.show();
    this.teacherService.upsert(this.teacher).subscribe(response => {
        this.popupService.success('Teacher Profile Created');
        this.refreshGrid(DefaultPageNumber, DefaultPageSize);
        this.hideDialog();
        this.spinner.hide();
      },
      error => {
        this.popupService.error('Teacher Profile was not created');
        this.spinner.hide();
      })

  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.teacherService.get(pageNumber, pageSize).subscribe(response => {
        this.teachers = response;
        this.loading = false;
      }
    )
  }

  retrieveStudyGroups() {
    this.studyGroupService.getAll().subscribe(response => {
      this.studyGroupOptions = response;
    })
  }

  retrieveMasterSubjects() {
    this.masterSubjectService.get().subscribe(response => {
      this.subjectOptions = response;
    })
  }

  getTeachersEmails() {
    this.userService.getFilteredEmails("", UserType.Teacher).subscribe(response => {
      this.userEmailOptions = response;
    })
  }

}
