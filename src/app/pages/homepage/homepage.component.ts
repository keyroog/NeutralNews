import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from '../../services/user.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsCardComponent } from 'src/app/components/news-card/news-card.component';
import { INews } from 'src/app/entities/entities';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Categorie } from 'src/app/entities/entities';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomepageComponent implements OnInit {
  searchInput!: String;
  loading = false;
  voidSearch = false;
  activeButton:string = 'all';
  news: INews[] = [];
  categorie = Categorie;

  userForm: FormGroup;

  fieldTextType: boolean=false;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    public userService: UserService,
    private searchService: SearchService,
    public newsService: NewsService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    public loader : LoaderService,
    private fb : FormBuilder,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.userForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      preferiti: new FormArray([]),
    });
    this.addCheckboxes();

    for(let i=0; i<this.categorie.length; i++){
      for(let j=0 ;j<this.userService.getPreferiti().length; j++){
        console.log(this.userService.getPreferiti()[j])
        if(this.categorie[i].id === this.userService.getPreferiti()[j]){
          this.userForm.controls['preferiti'].get(''+i)?.setValue(true);
        }
      }
    }
  }

  onCheckChange(event:any) {
    const formArray: FormArray = this.userForm.get('preferiti') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
  }

  private addCheckboxes() {
    this.categorie.forEach(() => this.preferitiFormArray.push(new FormControl(false)));
  }

  get preferitiFormArray() {
    return this.userForm.controls['preferiti'] as FormArray;
  }

  ngOnInit(): void {
    console.log(this.userService.getUsername());
    console.log(this.userService.getPassword());

    this.userForm.controls['username'].setValue(this.userService.getUsername());
    this.userForm.controls['password'].setValue(this.userService.getPassword());
  }
  logout() {
    this.userService.logout();
  }

  async search() {
    this.loading = true;
    this.searchService.search(this.searchInput);
    this.news = this.newsService.getNews();
  }

  async showMore() {
    this.searchService.showMore(this.searchInput, this.news.length);
  }

  open(content:any) {
    this.modalService.open(content, { centered: true });
  }

  filterSelection(filter:string){

  }
  setActive(buttonName:string){
    this.activeButton = buttonName;

  }
  isActive(buttonName:string){
    return this.activeButton === buttonName;
  }

  disconnect(){
    this.userService.logout();
  }
  
}
