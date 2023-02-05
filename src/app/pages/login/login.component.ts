import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStorageService } from '../../services/login-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  constructor(private loginStorageService : LoginStorageService,private userService : UserService,private router : Router) { }

  ngOnInit(): void {
    console.log("user logged");
    if(this.userService.checkUser()){
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.loginStorageService.checkLogin(this.username, this.password);
  }

}
