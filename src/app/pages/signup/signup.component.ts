import { Component, OnInit } from '@angular/core';
import { ISignUp } from 'src/entities';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { SignupStorageService } from '../../services/signup-storage.service';
import { Categorie } from 'src/app/entities/entities';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userSignup:FormGroup;
  categorie = Categorie;
  signUp!:ISignUp;
  username = new FormControl('');

  onCheckChange(event:any) {
    const formArray: FormArray = this.userSignup.get('preferiti') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
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
      console.log(this.userSignup.value);
      const selectedCategory = this.userSignup.value.preferiti
        .map((checked:any, i:number) => checked ? this.categorie[i].id : null)
        .filter((v:any) => v !== null);
      console.log(JSON.stringify(selectedCategory));
      if(selectedCategory.length === 0){
        alert("Please enter at least one preference");
        return;
      }
      let valueToPass = JSON.stringify(selectedCategory);
      this.signupService.signup(this.userSignup.value.username,this.userSignup.value.password,valueToPass);
    }
  }

  constructor(private fb:FormBuilder,private signupService : SignupStorageService) {
    this.userSignup = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      preferiti: new FormArray([]),
    });

    this.addCheckboxes();
  }
  private addCheckboxes() {
    this.categorie.forEach(() => this.preferitiFormArray.push(new FormControl(false)));
  }

  get preferitiFormArray() {
    return this.userSignup.controls['preferiti'] as FormArray;
  }
   
  ngOnInit(): void {
  }

}
