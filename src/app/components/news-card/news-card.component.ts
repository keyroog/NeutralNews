import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INews } from 'src/app/entities/entities';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() news!: INews;
  @Input() index!: number;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

}
