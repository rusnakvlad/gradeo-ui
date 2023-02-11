import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {MenuItemModel} from "../models/menu.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuUpdated: EventEmitter<MenuItemModel[]> = new EventEmitter<MenuItemModel[]>();

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  public getMenuItems(): Observable<MenuItemModel[]> {
    return this.httpClient.get<MenuItemModel[]>(this.commonApi.menuItems);
  }

  public updateMenuItems() {
    this.httpClient.get<MenuItemModel[]>(this.commonApi.menuItems).subscribe(response => {
      this.menuUpdated.emit(response);
    });
  }

  public getAdminDataTabs(): Observable<MenuItemModel[]> {
    return this.httpClient.get<MenuItemModel[]>(this.commonApi.menuItems + '/adminData');
  }
}
