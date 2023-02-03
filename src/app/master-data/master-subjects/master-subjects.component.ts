import {Component, OnInit} from '@angular/core';
import {MasterSubject} from "../../shared/models/subject.model";
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {MasterSubjectService} from "../../shared/services/master-subject.service";
import {DefaultPageNumber, DefaultPageSize} from "../../shared/models/pagination.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-master-subjects',
  templateUrl: './master-subjects.component.html',
  styleUrls: ['./master-subjects.component.scss']
})
export class MasterSubjectsComponent implements OnInit {
  subject: MasterSubject;
  selectedSubjects: MasterSubject[] = [];
  subjects?: MasterSubject[];
  showDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;


  constructor(private masterSubjectService: MasterSubjectService, private messageService: MessageService,) {
  }

  openNew() {
    this.subject = {} as MasterSubject;
    this.showDialog = true;
  }

  edit(subject: MasterSubject) {
    this.openNew();
    this.subject = subject;
  }

  deleteSingle(id: number) {

  }

  deleteSelected() {

  }

  ngOnInit(): void {
    this.refreshGrid();
  }

  refreshGrid() {
    this.loading = true;
    this.masterSubjectService.get().subscribe(response => {
        this.subjects = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      })
  }

  hideDialog() {
    this.showDialog=false;
    this.submitted = false;
  }

  saveContent() {
    this.masterSubjectService.upsert(this.subject).subscribe(response => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
        this.showDialog = false;
        this.refreshGrid();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Record not created', life: 3000});
      })
  }
}
