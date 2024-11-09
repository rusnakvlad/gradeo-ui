import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.userAuthService.login(this.email, this.password);
  }
}
