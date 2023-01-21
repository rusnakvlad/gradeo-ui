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

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderBarComponent,
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
    MenuModule,
    TieredMenuModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    CardModule,
    InputTextModule,
    RippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
