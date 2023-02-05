import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {MenuItemModel} from "../models/menu.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  public getMenuItems(): Observable<MenuItemModel[]> {
    return this.httpClient.get<MenuItemModel[]>(this.commonApi.menuItems);

  }

}
