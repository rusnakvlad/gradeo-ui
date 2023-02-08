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
import {AssignedSubjectsComponent} from "./master-data/assigned-subjects/assigned-subjects.component";

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
        path: 'users',
        component: UsersComponent,
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
            path: 'assignedSubjects',
            component: AssignedSubjectsComponent,
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
