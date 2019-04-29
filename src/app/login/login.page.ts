import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showspinner: boolean;
  constructor(public auth: AuthService, public rtr: Router) {
    this.showspinner = false;
  }

  ngOnInit() {}

  async googleLogin() {
    this.showspinner = true;
    this.rtr.navigate([`/tabs`]);
    console.log(`Login Component: google login`);
    await this.auth.googleLogin();
  }

  async anonLogin() {
    this.showspinner = true;
    await this.auth.anonymousLogin();
    // this.rtr.navigate([`tabs`]);
  }
}
