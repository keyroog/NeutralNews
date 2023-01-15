import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router }from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignupStorageService {

  constructor(
    private http: HttpClient,
    private router : Router, 
  ) { }


  signup(username:string,password:string,preferiti : string){
    let body = {
      'username':username,
      'password':password,
      'preferiti':preferiti,
    }
    this.http.post('https://projectfunctionservice.azurewebsites.net/api/cloudprojectsignup?code=VGEmUnYhsidoq16IJQzb8FqjXwV001DwpvI-rPxOxmnEAzFu4Z-JAg==',body)
      .subscribe(data => {
        console.log(data);
        if(data){
          alert('Signup successful');
          this.router.navigate(["login"]);
        }else{
          alert("username already in use");
        }
      }
    );
  }
}
