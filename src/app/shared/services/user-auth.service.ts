import { EventEmitter, Injectable } from '@angular/core';
import { UserDetails } from "../models/user.model";
import { UserService } from "./user.service";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  currentUser: UserDetails;
  user: EventEmitter<UserDetails> = new EventEmitter<UserDetails>();

  constructor(private userService: UserService,
    private fireAuth: AngularFireAuth,
    private router: Router) {
  }

  // login method
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      let authInfo = res.user?.multiFactor as any;

      this.userService.getUserByEmail(authInfo.user.email).subscribe(userDetails => {

        this.setToken(authInfo.user.accessToken);

        this.currentUser = userDetails;

        this.user.emit(this.currentUser);

        this.router.navigate(['/']);
      })

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // sign out
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('accessToken');
      window.location.reload();
    }, err => {
      alert(err.message);
    })
  }

  isAuth(): boolean {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken == null) {
      return false;
    }

    if (this.isTokenExpired(accessToken)) {
      return false;
    }

    return true;
  }

  setToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      let hasExpired = decodedToken.exp < currentTime;
      return hasExpired; // Token is valid if exp is in the future
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Assume invalid token on error
    }
  }

}
