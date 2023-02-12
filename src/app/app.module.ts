import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

import { msalConfig, loginRequest, protectedResources } from './auth-config';

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

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(protectedResources.GradeoCoreApi.endpoint, protectedResources.GradeoCoreApi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}

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
    MsalModule,
    DialogModule,
    ConfirmDialogModule,
    TabMenuModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    InputSwitchModule,
    ChipModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
