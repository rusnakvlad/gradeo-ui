import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import the Angular HTTP interceptor.
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchoolsComponent } from './schools/schools.component';


import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';

import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderBarComponent } from './layout/header-bar/header-bar.component';
import {FormsModule} from "@angular/forms";
import {MenuModule} from "primeng/menu";
import {TieredMenuModule} from "primeng/tieredmenu";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { UsersComponent } from './users/users.component';
import { MasterDataComponent } from './master-data/master-data.component';
import {TabMenuModule} from "primeng/tabmenu";
import { MasterSubjectsComponent } from './master-data/master-subjects/master-subjects.component';
import { RolesComponent } from './master-data/roles/roles.component';
import {MultiSelectModule} from "primeng/multiselect";
import { StudyGroupsComponent } from './master-data/study-groups/study-groups.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { StudentProfilesComponent } from './student-profiles/student-profiles.component';
import { TeacherProfilesComponent } from './teacher-profiles/teacher-profiles.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import {InputSwitchModule} from "primeng/inputswitch";
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import {ChipModule} from "primeng/chip";
import { StudentGradesComponent } from './student-grades/student-grades.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { StudentsGradesComponent } from './students-grades/students-grades.component';
import {CalendarModule} from "primeng/calendar";
import {ChartModule} from "primeng/chart";
import { StatisticsComponent } from './statistics/statistics.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import {MessageModule} from "primeng/message";
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { firebaseConfig } from './firebase.config';
import { AngularFireModule } from '@angular/fire/compat'

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderBarComponent,
    WelcomeComponent,
    UsersComponent,
    MasterDataComponent,
    MasterSubjectsComponent,
    RolesComponent,
    StudyGroupsComponent,
    StudentProfilesComponent,
    TeacherProfilesComponent,
    SchoolProfileComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    StudentGradesComponent,
    StudentsGradesComponent,
    StatisticsComponent,
    AnalyticsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    MenuModule,
    TieredMenuModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    CardModule,
    InputTextModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
    TabMenuModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    InputSwitchModule,
    ChipModule,
    FullCalendarModule,
    CalendarModule,
    ChartModule,
    ToggleButtonModule,
    MessageModule,
    //AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
