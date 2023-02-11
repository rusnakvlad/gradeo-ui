import {Component, OnInit} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {MenuService} from "../shared/services/menu.service";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router, private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getAdminDataTabs().subscribe(response => {
        this.items = response.map(x => {
          return {
            label: x.name,
            icon: x.primeIcon,
            routerLink: x.routerLink
          } as MenuItem
        })
        this.activeItem = this.items[0];
        this.router.navigate(['admin/' + this.items[0].routerLink])
      }
    )
  }
}
