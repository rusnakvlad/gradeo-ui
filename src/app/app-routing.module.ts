import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SchoolsComponent} from "./schools/schools.component";
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
import {StudentGradesComponent} from "./student-grades/student-grades.component";
import {StudentsGradesComponent} from "./students-grades/students-grades.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import { LoginComponent } from './login/login.component';

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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'schools',
        component: SchoolsComponent,
        
      },
      {
        path: 'schoolProfile',
        component: SchoolProfileComponent,
        
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        
      },
      {
        path: 'users',
        component: UsersComponent,
        
      },
      {
        path: 'myGrades',
        component: StudentGradesComponent,
        
      },
      {
        path: 'studentsGrades',
        component: StudentsGradesComponent,
        
      },
      {
        path: 'students',
        component: StudentProfilesComponent,
        
      },
      {
        path: 'studentProfile',
        component: StudentProfileComponent,
        
      },
      {
        path: 'teachers',
        component: TeacherProfilesComponent,
        
      },
      {
        path: 'teacherProfile',
        component: TeacherProfileComponent,
        
      },
      {
        path:'admin',
        component: MasterDataComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
