import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  logout() {
    this.userService.logout();
  }

  search() {
    throw new Error('Method not implemented.');
  }

}
