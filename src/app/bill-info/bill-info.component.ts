import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../products/products';
import { BillsModal } from './BillsModal';
import { BillsResult } from './BillsResult';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss'],
})
export class BillInfoComponent implements OnInit {
  billsList: BillsResult[] = [];
  showBill: boolean = false;
  moreBill: BillsModal = {} as BillsModal;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.resolveBill().subscribe((res: BillsResult[]) => {
      this.billsList = res;
      console.log(res);
    });
  }

  openBill(bill: BillsResult) {
    console.log(bill);
    this.showBill = true;
    if (this.showBill) {
      this.moreBill = {
        id: bill.id,
        customerId: bill.customerId,
        dateCreated: bill.dateCreated,
        customerName: bill.customerName,
        products: [],
        total: bill.total,
      };
      let products = bill.productsId.split(',');
      let distintProducts = new Set(products);
      distintProducts.forEach((ele) => {
        let qty = 0;
        products.forEach((element) => {
          if (ele === element) {
            qty++;
          }
        });
        this.resolveProduct(ele).subscribe((res) => {
          this.moreBill.products.push({
            id: res.id,
            productName: res.productName,
            productType: res.productType,
            hsn: res.hsn,
            basic: res.basic,
            qty: qty,
            gst: res.gst,
            total: Number(res.total) * Number(qty),
          });
        });
      });
      console.log(this.moreBill);
    }
  }

  resolveBill(): Observable<any> {
    return this.http.get('http://localhost:8003');
  }

  resolveProduct(id: any): Observable<any> {
    return this.http.get(`http://localhost:8001/${id}`);
  }
}
