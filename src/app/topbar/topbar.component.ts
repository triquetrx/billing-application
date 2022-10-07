import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  constructor(router: Router, public cookies: CookieService) {}
  isExpanded: boolean = false;
  toggleChange() {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }

  ngOnInit(): void {}
}
