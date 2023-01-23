import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {SchoolService} from "../shared/services/school.service";
import {SchoolInfo} from "../shared/models/school.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})

export class SchoolsComponent implements OnInit {

  school:SchoolInfo | any;
  schools:SchoolInfo[] = [];
  selectedSchools:SchoolInfo[] = [];
  schoolDialog: boolean = false;
  submitted: boolean = false;
  constructor(
    private schoolService: SchoolService,
    private messageService: MessageService
  ) {
  }
  ngOnInit(): void {
    this.schoolService.getOrganizations().subscribe(x => this.schools = x)
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

  saveContent(){
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'School Created', life: 3000});
  }
}
