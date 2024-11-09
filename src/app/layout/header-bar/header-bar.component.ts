import {Component, Inject, OnInit} from '@angular/core';
import {LayoutService} from "../../shared/services/layout.service";
import {Subject} from "rxjs";
import {MenuService} from "../../shared/services/menu.service";
import {UserAuthService} from "../../shared/services/user-auth.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  public logoUrl: string = "https://www.figma.com/file/IMkmmmjNK2z2e2Cx8NGlZL/Untitled?node-id=4%3A15&t=UODtvCO568UJFrpA-4";
  isIframe = false;
  loginDisplay = false;
  userDisplayName?: string;
  items: MenuItem[];
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private layoutService: LayoutService,
    private menuService: MenuService,
    private userAuthService: UserAuthService
  ) {
    this.userAuthService.user.subscribe(user => {
      this.menuService.updateMenuItems()
    })
  }
}
