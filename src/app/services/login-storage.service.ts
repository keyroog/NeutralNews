import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { ILikes } from 'src/entities';
import { Router }from '@angular/router';
import { UserService } from './user.service';
import { environment } from '../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginStorageService {

  constructor(
    private http: HttpClient,
    private router : Router,
    private userService: UserService
  ) { }

  checkLogin(username: string, password: string) {
    let body = {'username': username, 'password': password, 'storageAccountKey': environment.storageAccountKey};
    this.http.post<ILikes | boolean>(environment.loginUrl,body)
      .subscribe(
        data => {
          if(typeof data === 'boolean'){
            alert("Password Errata");
          }else{
            this.userService.storeUserInformation(data);
            this.router.navigate(['home']);
          }
        },
        error => {
          //check error status
          if(error.status == 500){
            alert("Username Errato");
          }
        }
    );
  }
}
