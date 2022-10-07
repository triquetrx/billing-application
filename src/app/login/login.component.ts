import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Login } from './Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private route: Router
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    if (this.cookies.get('token')) {
      this.route.navigate(['/dashboard']);
    }
  }
  isAlert: Boolean = false;
  alertType: String = '';
  alertMessage: String = '';

  loginData(login: Login) {
    this.resolveLogin(login).subscribe({
      next: (res) => {
        this.cookies.set('token', res.token);
        this.route.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isAlert = true;
        this.alertType = 'danger';
        if (err.status === 401) {
          this.alertMessage = 'Invalid Credentials';
        } else if (err.status === 404) {
          this.alertMessage = 'Invalid Username';
        } else {
          this.alertMessage =
            'Oops, We are sorry unexpected error occured. Please try again after sometime';
        }
      },
    });
  }

  resolveLogin(login: Login): Observable<any> {
    return this.http.post('http://localhost:8004/login', login);
  }
}
