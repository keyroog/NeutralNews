import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStorageService } from '../../services/login-storage.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  constructor(private loginStorageService : LoginStorageService,private userService : UserService,private router : Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log("user logged");
    if(this.userService.checkUser()){
      this.router.navigate(['/home']);
    }
  }

  login() {
    const usr = this.userForm.value.username;
    const pass = this.userForm.value.password;
    console.log(usr,pass);
    if(usr && pass)
    this.loginStorageService.checkLogin(usr, pass);
  }

}
