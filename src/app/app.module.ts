import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillInfoComponent } from './bill-info/bill-info.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipePipe } from './filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { BillsMainComponent } from './bills-main/bills-main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    BillInfoComponent,
    GenerateBillComponent,
    CustomersComponent,
    ProductsComponent,
    FilterPipePipe,
    BillsMainComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    TextFieldModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'bill', component: BillsMainComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'customers', component: CustomersComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
