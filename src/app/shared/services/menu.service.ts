import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {MenuItem} from "../models/menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItems: MenuItem[];

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  public getMenuItems(): MenuItem[] {
    if (!this.menuItems || this.menuItems?.length == 0) {
      this.httpClient.get<MenuItem[]>(this.commonApi.menuItems).subscribe(response => {
        this.menuItems = response;
        return this.menuItems;
      })
    }
    return this.menuItems;
  }

  public setItems(){
    this.httpClient.get<MenuItem[]>(this.commonApi.menuItems).subscribe(response => {
      this.menuItems = response;
      return this.menuItems;
    })
  }

}
