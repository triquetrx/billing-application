import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills-main',
  templateUrl: './bills-main.component.html',
  styleUrls: ['./bills-main.component.scss'],
})
export class BillsMainComponent implements OnInit {
  showGenerateBill: boolean = true;

  constructor() {}

  toggleShow(): void {
    this.showGenerateBill = !this.showGenerateBill;
  }

  ngOnInit(): void {}
}
