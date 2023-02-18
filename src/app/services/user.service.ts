import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private likes: any;
  private count: any;
  private username!:string;
  private password!:string;

  constructor() {
  }


  checkUser(){
    if(localStorage.getItem("username")!=null){
      return true;
    }else{
      return false;
    }
  }

  storeUserInformation(data:any){
    this.username = data.username;
    this.password = data.password;
    this.likes = JSON.parse(data.preferiti);
    localStorage.setItem('username',this.username);
    localStorage.setItem('password',this.password);
    localStorage.setItem('preferiti',data.preferiti);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('preferiti');
    window.location.reload();
  }

  getUsername(){
    return localStorage.getItem('username')!;
  }

  getPassword(){
    return localStorage.getItem('password')!;
  }
  
  getPreferiti(){
    return JSON.parse(localStorage.getItem('preferiti')!);
  }
}
