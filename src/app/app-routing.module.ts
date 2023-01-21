import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SchoolsComponent} from "./schools/schools.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'schools', component: SchoolsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
