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
      .subscribe(data => {
        if(typeof data === 'boolean'){
          alert("non puoi entrare");
          console.log('booleano');
          console.log(data);
        }else{
          console.log(data);
          this.userService.storeUserInformation(data);
          this.router.navigate(['home']);
        }
      }
    );
  }

  /*
  checkLogin2(username: string, password: string) {
    let body = {'username': username, 'password': password};
    this.http.post('https://cloudprojectlogin.azurewebsites.net/api/cloudprojectlogin?code=Vi7AEgQYr_MwGbXv4HrWvnDr-aKGRthorVMBJZYNU1YnAzFuAHNpnA==',body)
    .subscribe(data => {
      if(data){
        this.preferiti = data;
        for(let object in this.preferiti){
          console.log(object);
        }
      }else{
        console.log(data)
      }
    });
  } */
}
