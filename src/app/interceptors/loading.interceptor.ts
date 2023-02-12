import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { NewsService } from '../services/news.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService,
    private newsService: NewsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    if(request.url === environment.searchUrl){
      this.loadingService.setLoading(true);
    }
    if(request.url === environment.updateUrl){
      this.loadingService.setLoading2(true);
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (request.url === environment.searchUrl) {
            if (event.body.documents.value.length == 0) {
              this.newsService.setVoid(true);
            }
          }
        }
      }),
      finalize(() => {
        this.totalRequests--;
        if (request.url === environment.searchUrl) {
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        }
        if(request.url === environment.updateUrl){
          this.loadingService.setLoading2(false);
        }
      })
    );
  }
}
