import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SchoolsComponent} from "./schools/schools.component";
import {MsalGuard, MsalRedirectComponent} from "@azure/msal-angular";
import {WelcomeComponent} from "./layout/welcome/welcome.component";
import {UsersComponent} from "./users/users.component";
import {MasterDataComponent} from "./master-data/master-data.component";
import {MasterSubjectsComponent} from "./master-data/master-subjects/master-subjects.component";
import {RolesComponent} from "./master-data/roles/roles.component";
import {StudyGroupsComponent} from "./master-data/study-groups/study-groups.component";
import {StudentProfilesComponent} from "./student-profiles/student-profiles.component";
import {TeacherProfilesComponent} from "./teacher-profiles/teacher-profiles.component";
import {SchoolProfileComponent} from "./school-profile/school-profile.component";
import {StudentProfileComponent} from "./student-profile/student-profile.component";
import {TeacherProfileComponent} from "./teacher-profile/teacher-profile.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'schools',
        component: SchoolsComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'schoolProfile',
        component: SchoolProfileComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'students',
        component: StudentProfilesComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'studentProfile',
        component: StudentProfileComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'teachers',
        component: TeacherProfilesComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'teacherProfile',
        component: TeacherProfileComponent,
        canActivate: [MsalGuard]
      },
      {
        path:'admin',
        component: MasterDataComponent,
        canActivate: [MsalGuard],
        children:[
          {
            path: 'subjects',
            component: MasterSubjectsComponent,
          },
          {
            path: 'studyGroups',
            component: StudyGroupsComponent,
          },
          {
            path: 'roles',
            component: RolesComponent,
          }
        ]
      }
    ]
  },
  {
    path: 'auth', component: MsalRedirectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
