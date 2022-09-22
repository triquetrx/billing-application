import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Products } from './products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class ProductsComponent implements OnInit {
  searchText: string = '';
  isFormOpen: boolean = false;
  productsList: Products[] = [];
  isAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.resolveItems().subscribe((data: Products[]) => {
      data.forEach((ele) => this.productsList.push(ele));
    });
  }

  toggleFormStatus() {
    this.isFormOpen = !this.isFormOpen;
  }

  newProduct(product: any) {
    this.http
      .post('http://localhost:8001', {
        productName: product.productName,
        productType: product.productType,
        hsn: product.hsnCode,
        basic: product.basic,
        gst: product.gstRate,
      })
      .subscribe({
        next: (res: any) => {
          this.isAlert = true;
          this.alertType = 'success';
          this.alertMessage = `Successfully, Added new product with id ${res.id}`;
        },
        error: (err: any) => {
          this.isAlert = true;
          this.alertType = 'danger';
          this.alertMessage = 'Oops, something went wrong';
          console.error(err);
        },
      });
  }

  resolveItems(): Observable<any> {
    return this.http.get('http://localhost:8001');
  }
}
