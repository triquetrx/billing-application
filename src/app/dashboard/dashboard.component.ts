import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  customerCount: String = '';
  billsCount: String = '';
  productsCount: String = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.resolveCustomers().subscribe({
      next: (res) => {
        this.customerCount = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.resolveProducts().subscribe({
      next: (res) => {
        this.productsCount = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.resolveBill().subscribe({
      next: (res) => {
        this.billsCount = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  resolveCustomers(): Observable<any> {
    return this.http.get('http://localhost:8002/count');
  }
  resolveProducts(): Observable<any> {
    return this.http.get('http://localhost:8001/count');
  }
  resolveBill(): Observable<any> {
    return this.http.get('http://localhost:8003/count');
  }
}
