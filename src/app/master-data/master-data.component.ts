import {Component, OnInit} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Subjects', icon: 'pi pi-fw pi-book', routerLink: 'subjects'},
      {label: 'Assigned Subjects', icon: 'pi pi-fw pi-book', routerLink: 'assignedSubjects'},
      {label: 'Roles', icon: 'pi pi-fw pi-sitemap', routerLink: 'roles'}
    ];
    this.activeItem = this.items[0];
    this.router.navigate(['admin/' + this.items[0].routerLink])
  }
}
