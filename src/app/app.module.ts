import { NgModule, OnInit } from '@angular/core';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SignupOneComponent } from './signup-one/signup-one.component';
import { SignupTwoComponent } from './signup-two/signup-two.component';
import { AuthServiceService } from './service/auth-service.service';
import { AuthGuard } from './service/auth.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

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
    LoginComponent,
    HomePageComponent,
    SignupComponent,
    SignupOneComponent,
    SignupTwoComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
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
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: 'bill', component: BillsMainComponent, canActivate: [AuthGuard] },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
    ]),
  ],
  providers: [CookieService, AuthServiceService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
