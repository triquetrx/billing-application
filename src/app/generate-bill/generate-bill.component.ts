import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../products/products';
import { BillProduct } from './BillProduct';
import { Customer } from './Customer';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class GenerateBillComponent implements OnInit {
  customerList: Customer[] = [];
  searchCustomer: string = '';
  productsList: Products[] = [];
  billProducts: BillProduct[] = [];
  billTo: Customer[] = [];
  checkIfPresent: BillProduct[] = [];
  searchProduct: string = '';
  flag: boolean = false;
  total: Number = 0;
  isAlert: boolean = false;
  alertMessage: String = '';
  alertType: String = '';

  constructor(private http: HttpClient) {}

  addProduct(product: Products) {
    let qty: Number = 1;
    this.total = 0;
    this.checkIfPresent = this.billProducts.filter(
      (ele) => ele.id === product.id
    );
    if (this.checkIfPresent.length < 1) {
      let billProduct = {
        id: product.id,
        productName: product.productName,
        productType: product.productType,
        hsn: product.hsn,
        basic: product.basic,
        qty: 1,
        gst: product.gst,
        total: product.total,
      };
      this.billProducts.push(billProduct);
    } else {
      qty = Number(this.checkIfPresent[0].qty) + 1;
      this.checkIfPresent[0].qty = qty;
      this.checkIfPresent[0].total =
        Number(this.checkIfPresent[0].total) * Number(qty);
    }
    this.billProducts.forEach((ele) => (this.total += ele.total));
  }

  addCustomer(customer: Customer) {
    console.log(customer);
    this.billTo.push(customer);
    this.flag = true;
  }

  ngOnInit(): void {
    this.resolveCustomer().subscribe((customers: Customer[]) => {
      customers.forEach((customer) => {
        this.customerList.push(customer);
      });
    });
    this.resolveProducts().subscribe((products: Products[]) => {
      products.forEach((product) => {
        this.productsList.push(product);
      });
    });
  }

  reset() {
    window.location.reload();
  }

  createBill() {
    if (this.billProducts.length === 0) {
      this.isAlert = true;
      this.alertMessage = 'Please select atleast one product';
      this.alertType = 'danger';
    }
    if (this.billTo.length === 0) {
      this.isAlert = true;
      this.alertMessage = 'Please select a payee';
      this.alertType = 'danger';
    }
    if (this.billProducts.length === 0 && this.billTo.length === 0) {
      this.isAlert = true;
      this.alertMessage = 'Please select a payee and atleast one products';
      this.alertType = 'danger';
    }
    if (this.billProducts.length > 0 && this.billTo.length > 0) {
      console.log(this.billProducts);
      console.log(this.billTo[0]);
      this.http
        .post('http://localhost:8003', {
          customerId: this.billTo[0].customerId,
          customerName: this.billTo[0].customerName,
          products: this.billProducts,
        })
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.isAlert = true;
            this.alertMessage = 'New Bill Created with Bill Number:' + res.id;
            this.alertType = 'success';
          },
          error: (err: any) => {
            this.isAlert = true;
            this.alertMessage =
              'There was an issue creating the bill; try again later';
            this.alertType = 'danger';
          },
        });
    }
  }

  resolveProducts(): Observable<any> {
    return this.http.get('http://localhost:8001');
  }

  resolveCustomer(): Observable<any> {
    return this.http.get('http://localhost:8002');
  }
}
