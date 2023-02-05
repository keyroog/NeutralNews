import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from '../../services/user.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsCardComponent } from 'src/app/components/news-card/news-card.component';
import { INews } from 'src/app/entities/entities';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchInput!: String;

  news: INews[] = [];

  constructor(private userService: UserService,private searchService : SearchService, private newsService : NewsService) { }

  ngOnInit(): void {
  }
  logout() {
    this.userService.logout();
  }

  async search() {
    this.searchService.search(this.searchInput);
    this.news = await this.newsService.getNews();
  }
}
