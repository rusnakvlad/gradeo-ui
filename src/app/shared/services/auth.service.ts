import { Injectable } from '@angular/core';
import {MsalService} from "@azure/msal-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: MsalService) {
  }

  isAuth(): boolean{
    return this.authService.instance.getAllAccounts().length > 0
  }
}
