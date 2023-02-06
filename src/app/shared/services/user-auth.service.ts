import { Injectable } from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {UserDetails} from "../models/user.model";
import {UserService} from "./user.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  currentUser: UserDetails;

  constructor(private authService: MsalService, private userService: UserService) {
  }

  isAuth(): boolean{
    return this.authService.instance.getAllAccounts().length > 0
  }

  getCurrentUser(): Observable<UserDetails>{
    if(this.currentUser != null && this.currentUser != undefined){
      return of(this.currentUser);
    }
    this.userService.getCurrentUser().subscribe(response => {
      this.currentUser = response;
      return of(this.currentUser);
    })

    return of({} as UserDetails);
  }
}
