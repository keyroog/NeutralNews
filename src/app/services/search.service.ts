import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { NewsService } from './news.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private newsService: NewsService) {}

  search(searchInput: String,language: string) {
    let body = {
      search: searchInput,
      bingSubscriptionKey: environment.bingSubscriptionKey,
      cognitiveSubscriptionKey: environment.cognitiveSubscriptionKey,
      cc:'IT',
      lang: language,
    };
    this.newsService.clearData();
    this.newsService.setVoid(false);
    this.http.post(environment.searchUrl, body).subscribe((data) => {
      this.newsService.storeData(data);
    });
    return false;
  }

  showMore(searchInput: String, offset: number) {
    let body = {
      search: searchInput,
      bingSubscriptionKey: environment.bingSubscriptionKey,
      cognitiveSubscriptionKey: environment.cognitiveSubscriptionKey,
      cc:'IT',
      lang: 'it',
      offset: offset ? offset : 0,
    };
    this.http.post(environment.searchUrl, body).subscribe((data) => {
      this.newsService.storeData(data);
    });
  }
}
