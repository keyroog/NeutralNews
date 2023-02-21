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
    password: ["", [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  });

  constructor(private loginStorageService : LoginStorageService,private userService : UserService,private router : Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    if(this.userService.checkUser()){
      this.router.navigate(['/home']);
    }
  }

  login() {
    const usr = this.userForm.value.username;
    const pass = this.userForm.value.password;
    if(usr && pass)
    this.loginStorageService.checkLogin(usr, pass);
  }

}
