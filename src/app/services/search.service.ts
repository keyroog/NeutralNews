import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { NewsService } from './news.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,private newsService: NewsService) { }


  search(searchInput: String) {
    let body = {'search': searchInput};
    this.http.post('https://cloudprojectfunction.azurewebsites.net/api/cloudprojectsearch?',body)
      .subscribe(data => {
        console.log(data);
        this.newsService.storeData(data);
      }
    );
  }
}
