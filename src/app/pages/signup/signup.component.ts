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
    if(this.userSignup.value.preferiti.length === 0){
      alert("Inserisci almeno una preferenza");
    }else if(this.userSignup.value.password !== this.userSignup.value.repeatPassword){
      alert("Le password non coincidono");
      return;
    }else{
      const selectedCategory = this.userSignup.value.preferiti
        .map((checked:any, i:number) => checked ? this.categorie[i].id : null)
        .filter((v:any) => v !== null);
      if(selectedCategory.length === 0){
        alert("Inserisci almeno 1 preferenza");
        return;
      }
      this.signupService.signup(this.userSignup.value.username,this.userSignup.value.password,JSON.stringify(selectedCategory));
    }
  }

  constructor(private fb:FormBuilder,private signupService : SignupStorageService) {
    this.userSignup = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      repeatPassword: ["", [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
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
