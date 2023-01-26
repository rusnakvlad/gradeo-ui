import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {SchoolService} from "../shared/services/school.service";
import {SchoolInfo, SchoolInfoPaged} from "../shared/models/school.model";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})

export class SchoolsComponent implements OnInit {

  school: SchoolInfo | any;
  schools: SchoolInfoPaged;
  selectedSchools: SchoolInfo[] = [];
  schoolDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private schoolService: SchoolService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.schoolService.getPaged(DefaultPageNumber, DefaultPageSize).subscribe(x => {
        this.schools = x;
        console.log(this.schools);
      }
    )
  }

  hideDialog() {
    this.schoolDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.school = {};
    this.submitted = false;
    this.schoolDialog = true;
  }

  editSchool(schoolMetadata: SchoolInfo){
    this.openNew();
    this.school = schoolMetadata;
  }
  saveContent() {
    this.submitted = true;
    if (this.validateFields() == false) {
      return;
    }
    this.schoolService.create(this.school).subscribe(response => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'School Created', life: 3000});
        this.schoolDialog = false;
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'School not created', life: 3000});
      })
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    console.log(event);
    this.schoolService.getPaged(pageNumber, pageSize).subscribe(x => {
        this.schools = x;
        this.loading = false;
      }
    )
  }

  validateFields(): boolean {
    if (!this.school.name || !this.school.country || !this.school.city) {
      return false;
    }
    return true;
  }
}
