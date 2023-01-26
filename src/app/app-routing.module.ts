import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SchoolsComponent} from "./schools/schools.component";
import {MsalGuard, MsalRedirectComponent} from "@azure/msal-angular";
import {WelcomeComponent} from "./layout/welcome/welcome.component";
import {UsersComponent} from "./users/users.component";

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
