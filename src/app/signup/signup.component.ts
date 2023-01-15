import { Component, OnInit } from '@angular/core';
import { ISignUp } from 'src/entities';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { SignupStorageService } from '../signup-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userSignup:FormGroup;

  userSignup2 = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
    preferiti : this.fb.array([]),
  });

  signUp!:ISignUp;
  username = new FormControl('');

  preferiti() : FormArray {  
    return this.userSignup.get("preferiti") as FormArray  
  }

  newPreferito(): FormGroup {  
    return this.fb.group({
      value : ''
    })  
  }

  addPreferito() {
    if(this.preferiti().length<=2)
      this.preferiti().push(this.newPreferito());
  }

  removePreferito(i:number) {  
    this.preferiti().removeAt(i);  
  }


  signup() {
    let preferitiArr:string[] = [];
    if(this.userSignup.value.username === ""){
      alert("Please enter a valid username");
      return;
    } else if(this.userSignup.value.password === ""){
      alert("Please enter a valid password");
      return;
    }else if(this.userSignup.value.preferiti.length === 0){
      alert("Please enter at least one preference");
    }else{
      console.log(this.userSignup.value.preferiti);
      console.log(preferitiArr);
      console.log(this.preferiti().at(0).value["value"])
      for(let i = 0 ; i < this.userSignup.value.preferiti.length; i++){
        console.log(this.preferiti().at(i).value["value"])
        preferitiArr.push(this.preferiti().at(i).value["value"]);
      }
      console.log(preferitiArr);
      let valueToPass = JSON.stringify(preferitiArr);
      this.signupService.signup(
        this.userSignup.value.username,
        this.userSignup.value.password,
        valueToPass,
      )
    }
  }

  constructor(private fb:FormBuilder,private signupService : SignupStorageService) {
    this.userSignup = this.fb.group({  
      username: '',
      password: '',
      preferiti: this.fb.array([]),
    });  
   }

  ngOnInit(): void {
  }

}
