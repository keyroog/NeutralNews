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
import { UpdateStorageService } from 'src/app/services/update-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBingResponse } from 'src/app/entities/entities';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomepageComponent implements OnInit {
  searchInput: String = "";
  oldPassword = "";
  selectedLanguage = "it";
  loading = false;
  voidSearch = false;
  updateLoading = false;
  activeButton:string = 'all';
  news: INews[] = [];
  totalEstimated = 0;
  categorie = Categorie;
  updateEnable = false;
  userForm: FormGroup;
  confirmUpdate: boolean = false;
  fieldTextType: boolean=false;
  filteredNews: INews[] = [];
  populate = false;

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
    private updateService: UpdateStorageService,
    private http: HttpClient,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.userForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      preferiti: new FormArray([]),
    });
    this.addCheckboxes();

    for(let i=0; i<this.categorie.length; i++){
      for(let j=0 ;j<this.userService.getPreferiti().length; j++){
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
    this.populate=true;
    this.userForm.controls['username'].setValue(this.userService.getUsername());
    this.userForm.controls['password'].setValue(this.userService.getPassword());
    this.userForm.get('password')?.disable();
    let body = {bingSubscriptionKey: environment.bingSubscriptionKey,cognitiveSubscriptionKey : environment.cognitiveSubscriptionKey, lang: 'it', preferiti : JSON.stringify(this.userService.getPreferiti())};
    this.http.post<any>(environment.populateUrl,body)
    .subscribe(data => {
      for(let i=0; i<data.documents.length; i++){
        let newsToStore : INews[] = [];
        for(let j = 0; j<data.documents[i].value.length && j< 10 ; j++){
          newsToStore.push({
            date: new Date(data.documents[i].value[j].datePublished),
            name: data.documents[i].value[j].name,
            description: data.documents[i].value[j].description,
            provider: {name:data.documents[i].value[j].provider[0].name,type:data.documents[i].value[j].provider[0]._type},
            url: data.documents[i].value[j].url,
            category : "provvisorio",
            sentiment: data.sentiment[i].documents[j].sentiment,
            sentimentScores: data.sentiment[i].documents[j].confidenceScores,
          })
        }
        this.newsService.storeHomeData(newsToStore);
        this.news.push(...newsToStore);
      }
    }
  );
  this.filteredNews = this.news;
  this.activeButton='all';
  }
  
  logout() {
    this.userService.logout();
  }

  search() {
    if(this.searchInput === ""){
      return
    }
    this.populate=false;
    this.loading = true;
    this.searchService.search(this.searchInput,this.selectedLanguage);
    this.totalEstimated = this.newsService.getEstimated();
    this.news = this.newsService.getNews();
    this.filteredNews = this.news;
    this.activeButton='all';
  }

  async showMore() {
    this.searchService.showMore(this.searchInput, this.news.length);
    this.news = this.newsService.getNews();
    if(this.activeButton === 'all'){
      this.filteredNews = this.news;
    }else{
      this.filteredNews = this.news.filter((news) => news.sentiment === this.activeButton);
    }
  }

  open(content:any) {
    this.modalService.open(content, { centered: true });
  }

  setActive(buttonName:string){
    this.activeButton = buttonName;
    if(this.activeButton === 'all'){
      this.filteredNews = this.news;
    }else{
      this.filteredNews = this.news.filter((news) => news.sentiment === this.activeButton);
    }
  }
  isActive(buttonName:string){
    return this.activeButton === buttonName;
  }

  disconnect(){
    this.userService.logout();
  }
  
  updateUser(content:any){
    this.updateEnable = false
    const selectedCategory = this.userForm.value.preferiti
        .map((checked:any, i:number) => checked ? this.categorie[i].id : null)
        .filter((v:any) => v !== null);
    if(selectedCategory.length === 0){
      alert("Seleziona almeno una categoria");
      this.modalService.dismissAll();
      return;
    }
    this.updateService.updateStorage(this.userForm.value.username,this.userForm.value.password,JSON.stringify(selectedCategory),content);
  }

  enableUpdate(){
    this.updateEnable = true;
    this.userForm.get('password')?.enable();
  }

  disableUpdate(){
    this.userForm.controls['password'].setValue(this.userService.getPassword());
    this.updateEnable = false;
    this.userForm.get('password')?.disable();
  }

  selectLanguage(language:string){
    this.selectedLanguage=language;
  }
}
