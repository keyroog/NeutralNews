import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { environment } from '../../../src/environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class UpdateStorageService {

  constructor(private http : HttpClient,private modalService : NgbModal) { }

  updateStorage(username: string, password: string,preferiti: string,content:any) {
    let body = {'username': username, 'password': password, 'preferiti': preferiti, 'storageAccountKey': environment.storageAccountKey};
    this.http.post(environment.updateUrl,body)
      .subscribe(data => {
        if(data){
          this.modalService.open(content,{ centered: true });
        }
      }
    );
  }
}
