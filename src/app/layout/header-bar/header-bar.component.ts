import {Component, Inject, OnInit} from '@angular/core';
import {LayoutService} from "../../shared/services/layout.service";
import {Subject} from "rxjs";
import {MenuService} from "../../shared/services/menu.service";
import {UserAuthService} from "../../shared/services/user-auth.service";
import {MenuItem} from "primeng/api";
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  public logoUrl: string = "https://www.figma.com/file/IMkmmmjNK2z2e2Cx8NGlZL/Untitled?node-id=4%3A15&t=UODtvCO568UJFrpA-4";
  isIframe = false;
  isLoggedIn = false;
  userDisplayName?: string;
  items: MenuItem[];

  constructor(
    private layoutService: LayoutService,
    private menuService: MenuService,
    private userAuthService: UserAuthService,
    private userService: UserService
  ) {
    this.userAuthService.user.subscribe(user => {
      this.menuService.updateMenuItems();
      this.userDisplayName = user.firstName + ' ' + user.lastName;
      this.isLoggedIn = true;
      this.setHeaderItems();
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userAuthService.isAuth();

    if(this.isLoggedIn){
      this.userService.getCurrentUser().subscribe(user => {
        this.menuService.updateMenuItems();
        this.userDisplayName = user.firstName + ' ' + user.lastName;
        this.setHeaderItems();
      })
    }
  }

  expandSidebar() {
    this.layoutService.menuToggled.emit(true);
  }

  setHeaderItems() {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout()
      }]
  }

  logout(){
    this.userAuthService.logout();
  }
}
