import { Component, OnInit } from '@angular/core';
import {UserDetails} from "../../shared/models/user.model";
import {StudyGroup, StudyGroupPaged} from "../../shared/models/study-group.model";
import {MasterSubject} from "../../shared/models/subject.model";
import {PopupService} from "../../shared/services/popup.service";
import {UserService} from "../../shared/services/user.service";
import {StudyGroupService} from "../../shared/services/study-group.service";
import {DefaultPageNumber, DefaultPageSize} from "../../shared/models/pagination.model";
import {LazyLoadEvent} from "primeng/api";
import {MasterSubjectService} from "../../shared/services/master-subject.service";
import {StudyGroupUpsertModel} from "../../shared/models/school.model";

@Component({
  selector: 'app-study-groups',
  templateUrl: './study-groups.component.html',
  styleUrls: ['./study-groups.component.scss']
})
export class StudyGroupsComponent implements OnInit {

  studyGroup: StudyGroupUpsertModel;
  studyGroups?: StudyGroupPaged;

  selectedGroups: StudyGroup[] = [];
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  subjectOptions: MasterSubject[];
  selectedSubjects: number[];
  currentUser: UserDetails;

  constructor( private popupService: PopupService,
               private userService: UserService,
               private masterSubjectService: MasterSubjectService,
               private studyGroupService: StudyGroupService) { }

  ngOnInit(): void {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize)
  }

  openNew() {
    this.studyGroup = {} as StudyGroupUpsertModel;
    this.retrieveSubjects();
    this.showDialog = true;
  }

  edit(studyGroup: StudyGroup) {
    this.selectedSubjects = studyGroup.subjects.map(x => x.id);
    this.openNew();
    this.studyGroup.id = studyGroup.id,
    this.studyGroup.name = studyGroup.name;
    this.studyGroup.subjectIds = studyGroup.subjects.map(x => x.id);
  }

  deleteSingle(id: number) {

  }

  deleteSelected() {

  }


  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.studyGroupService.get(pageNumber, pageSize).subscribe(response => {
        this.studyGroups = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      })
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
  }

  saveContent() {
      this.studyGroup.subjectIds = this.selectedSubjects;
      this.studyGroupService.upsert(this.studyGroup).subscribe(response => {
          this.popupService.success('Study Group Created');
          this.refreshGrid(DefaultPageNumber, DefaultPageSize);
        },
        error => {
          this.popupService.error('Study Group was not created');
        })

  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.studyGroupService.get(pageNumber, pageSize).subscribe(response => {
        this.studyGroups = response;
        this.loading = false;
      }
    )
  }

  retrieveSubjects() {
    this.masterSubjectService.get().subscribe(response => {
      this.subjectOptions = response;
    })
  }
}
