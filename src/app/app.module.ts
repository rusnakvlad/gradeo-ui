import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { BusinessUnitDropdownComponent } from './layout/header-bar/business-unit-dropdown/business-unit-dropdown.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderBarComponent,
    BusinessUnitDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
