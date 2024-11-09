import { EventEmitter, Injectable } from '@angular/core';
import { UserDetails } from "../models/user.model";
import { UserService } from "./user.service";
import { Observable, of } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  currentUser: UserDetails;
  user: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService, 
    private fireAuth: AngularFireAuth,
    private router: Router) {
  }

  // login method
  login(email: string, password: string) {
    // this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
    //   localStorage.setItem('token', 'true');
    //   console.log(res);
    //   this.user.emit(res);
    // }, err => {
    //   alert(err.message);
    //   this.router.navigate(['/login']);
    // })
  }

  // sign out
  logout() {
    // this.fireAuth.signOut().then(() => {
    //   localStorage.removeItem('token');
    //   this.router.navigate(['/login']);
    // }, err => {
    //   alert(err.message);
    // })
  }

  isAuth(): boolean {
    return true;
  }

  getCurrentUser(): Observable<UserDetails> {
    if (this.currentUser != null && this.currentUser != undefined) {
      return of(this.currentUser);
    }
    this.userService.getCurrentUser().subscribe(response => {
      this.currentUser = response;
      return of(this.currentUser);
    })

    return of({} as UserDetails);
  }
}
