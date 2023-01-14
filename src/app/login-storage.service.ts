import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginStorageService {
  private preferiti!:string[];

  constructor(private http: HttpClient) { }

  checkLogin(username: string, password: string) {
    let body = {'username': username, 'password': password};
    this.http.post('https://cloudprojectlogin.azurewebsites.net/api/cloudprojectlogin?code=Vi7AEgQYr_MwGbXv4HrWvnDr-aKGRthorVMBJZYNU1YnAzFuAHNpnA==',body)
    .subscribe(data => {
      if(data){
        console.log(data);
        console.log("non ho trovato nulla")
      }else{
        console.log(data)
      }
    });
  }


  checkUser(){
    if(localStorage.getItem("preferiti")){
      return true;
    }else{
      return false;
    }
  }
}
