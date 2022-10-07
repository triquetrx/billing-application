import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-one',
  templateUrl: './signup-one.component.html',
  styleUrls: ['./signup-one.component.scss'],
})
export class SignupOneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  isNextPage: Boolean = false;

  onNext(data: any) {
    if (data.valid) {
      localStorage.setItem('data', JSON.stringify(data.value));
      this.isNextPage = true;
    }
  }
}
