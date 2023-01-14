import { Component, OnInit } from '@angular/core';
import { LoginStorageService } from '../login-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  constructor(private loginStorageService : LoginStorageService) { }

  ngOnInit(): void {
  }

  loginFunction() {
    this.loginStorageService.checkLogin(this.username, this.password);
  }

}
