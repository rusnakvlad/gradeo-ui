import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {LayoutService} from "../../shared/services/layout.service";
import {MenuItem} from "../../shared/models/menu.model";
import {MenuService} from "../../shared/services/menu.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  display: boolean = false;
  menuItems: MenuItem[];
  constructor(private layoutService: LayoutService, private menuService: MenuService) {
    layoutService.menuToggled.subscribe(sidebarState => this.display = sidebarState);
  }

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
  }

  closeSidebar(){
    this.layoutService.menuToggled.emit(false);
  }
}
