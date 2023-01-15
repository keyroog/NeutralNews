import { Injectable } from '@angular/core';
import { ILikes } from 'src/entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private likes: any;
  private count: any;
  private partitionKey:any;

  constructor() { 
    this.likes = [];
    this.count = 0;
  }


  checkUser(){
    if(localStorage.getItem("username")){
      return true;
    }else{
      return false;
    }
  }

  storeUserInformation(data:ILikes){
    this.partitionKey = data.partitionKey
    this.likes = JSON.parse(data.preferiti)
    this.count = this.likes.length;
    localStorage.setItem('username',this.partitionKey);
  }

  logout() {
    localStorage.removeItem('username');
    window.location.reload();
  }

}
