import { Injectable } from '@angular/core';
import { INews } from '../entities/entities';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: INews[] = [];

  storeData(data: any) {
    console.log("store data");
    console.log(data);
    let i = 0;
    data.documents.value.forEach((element: any) => {
      this.news.push({
        date: new Date(element.datePublished),
        name: element.name,
        description: element.description,
        provider: {name:element.provider[0].name,type:element.provider[0]._type},
        url: element.url,
        sentiment: data.sentiment.documents[i].sentiment,
        sentimetScores: data.sentiment.documents[i].confidenceScores,
      });
    });
    console.log(this.news);
  }

  getNews(){
    return this.news;
  }

  constructor() { }
}
