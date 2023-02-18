import { Injectable } from '@angular/core';
import { INews } from '../entities/entities';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: INews[] = [];

  void = false;

  totalEstimatedMatches: number = 0;

  storeData(data: any) {
    let i = 0;
    data.documents.value.forEach((element: any) => {
      this.news.push({
        date: new Date(element.datePublished),
        name: element.name,
        description: element.description,
        provider: {name:element.provider[0].name,type:element.provider[0]._type},
        url: element.url,
        category : element.category ? element.category : "No category",
        sentiment: data.sentiment.documents[i].sentiment,
        sentimentScores: data.sentiment.documents[i].confidenceScores,
      });
      i++;
    });
    this.totalEstimatedMatches = data.documents.totalEstimatedMatches;
  }

  storeHomeData(data: any) {
    this.news.push(data);
  }

  getNews(){
    return this.news;
  }

  clearData(){
    this.news = [];
  }

  getEstimated(){
    return this.totalEstimatedMatches;
  }

  setVoid(bool: boolean){
    this.void = bool;
  }

  getVoid(){
    return this.void;
  }

  constructor() { }
}
