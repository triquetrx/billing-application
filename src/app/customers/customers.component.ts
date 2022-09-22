import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class CustomersComponent implements OnInit {
  searchText: string = '';
  isFormOpen: boolean = false;
  customerList: Customer[] = [];
  isAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';
  constructor(private http: HttpClient) {}

  toggleFormStatus() {
    this.isFormOpen = !this.isFormOpen;
  }

  ngOnInit(): void {
    this.resolveCustomers().subscribe((data: Customer[]) => {
      data.forEach((ele) => this.customerList.push(ele));
    });
  }

  resolveCustomers(): Observable<any> {
    return this.http.get('http://localhost:8002');
  }

  newCustomer(customer: any) {
    console.log(customer);
    this.http
      .post('http://localhost:8002', {
        customerName: customer.customerName,
        customerAddress: customer.customerAddress,
        customerCity: customer.city,
        customerNumber: customer.customerNumber,
        customerGST: customer.customerGST,
      })
      .subscribe({
        next: (res: any) => {
          this.isAlert = true;
          this.alertType = 'success';
          this.alertMessage = `Successfully, Added new customer with id: ${res.customerId}`;
        },
        error: (err: any) => {
          this.isAlert = true;
          this.alertType = 'danger';
          this.alertMessage = 'Oops, something went wrong';
          console.error(err);
        },
      });
  }
}
