import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {SchoolService} from "../shared/services/school.service";
import {SchoolInfo, SchoolInfoPaged} from "../shared/models/school.model";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {DefaultPageNumber, DefaultPageSize} from "../shared/models/pagination.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})

export class SchoolsComponent implements OnInit {

  school: SchoolInfo;
  schools?: SchoolInfoPaged;
  selectedSchools: SchoolInfo[] = [];
  schoolDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private schoolService: SchoolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.refreshGrid(DefaultPageNumber, DefaultPageSize);
  }

  hideDialog() {
    this.schoolDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.school = {} as SchoolInfo;
    this.submitted = false;
    this.schoolDialog = true;
  }

  deleteSingle(id?: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected school(s)?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.schoolService.delete([id as number]).subscribe(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'School(s) Deleted',
              life: 3000
            });
          },
          error => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'School(s) not deleted', life: 3000});
          })

      }
    });
  }

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected school(s)?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.schoolService.delete(this.selectedSchools.map(x => x.id)).subscribe(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'School(s) Deleted',
              life: 3000
            });
            this.refreshGrid(DefaultPageNumber, DefaultPageSize);
          },
          error => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'School(s) not deleted', life: 3000});
          })
      }
    });
  }

  editSchool(schoolMetadata: SchoolInfo) {
    this.openNew();
    this.school = schoolMetadata;
  }

  saveContent() {
    this.submitted = true;
    if (this.validateFields() == false) {
      return;
    }
    this.schoolService.upsert(this.school as SchoolInfo).subscribe(response => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Record saved', life: 3000});
        this.schoolDialog = false;
        this.refreshGrid(DefaultPageNumber, DefaultPageSize);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'School not created', life: 3000});
      })
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    let pageSize: number = event.rows as number;
    let pageNumber = (event.first as number / pageSize) + 1;

    this.schoolService.getPaged(pageNumber, pageSize).subscribe(response => {
        this.schools = response;
      }
    )

    this.loading = false;
  }

  refreshGrid(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.schoolService.getPaged(pageNumber, pageSize).subscribe(response => {
        this.schools = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }

  validateFields(): boolean {
    if (!this?.school?.name || !this.school.country || !this.school.city) {
      return false;
    }
    return true;
  }
}
