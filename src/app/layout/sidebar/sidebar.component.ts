import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../shared/services/layout.service";
import {MenuItemModel} from "../../shared/models/menu.model";
import {MenuService} from "../../shared/services/menu.service";
import {ThemeService} from "../../shared/services/theme.service";
import {Theme} from "../../shared/enums/theme";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  display: boolean = false;
  menuItems: MenuItemModel[];
  isDarkMode: boolean = false;

  constructor(private layoutService: LayoutService, private menuService: MenuService, private themeService: ThemeService) {
    layoutService.menuToggled.subscribe(sidebarState => this.display = sidebarState);
    menuService.menuUpdated.subscribe(response => this.menuItems = response);
  }

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe(response => {
      this.menuItems = response;
    })
    this.isDarkMode = this.themeService.isLastSelectedDarkMode();
  }

  closeSidebar() {
    this.layoutService.menuToggled.emit(false);
  }

  switchTheme() {
    let newMode = this.isDarkMode ? Theme.DarkMode : Theme.LightMode;
    this.themeService.switchTheme(newMode);
  }
}
