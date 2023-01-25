import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {SchoolService} from "../shared/services/school.service";
import {SchoolInfo, SchoolInfoPaged} from "../shared/models/school.model";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

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
    this.schoolService.getOrganizations(DefaultPageNumber, DefaultPageSize).subscribe(x => {
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

  saveContent() {

    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'School Created', life: 3000});
    this.submitted = true;
    this.schoolDialog = false;
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    console.log(event);
    this.schoolService.getOrganizations(pageNumber, pageSize).subscribe(x => {
        this.schools = x;
        this.loading = false;
      }
    )
  }
}
