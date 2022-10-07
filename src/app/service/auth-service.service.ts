import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router
  ) {}
  url: string = 'http://localhost:8000/validate';
  isAuthenticated(): Boolean {
    if (this.cookies.get('token')) {
      let header = new HttpHeaders({
        Authorization: `Bearer ${this.cookies.get('token')}`,
      });
      let isValidToken;
      this.resolveToken(header).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/login']);
        },
      });
      return true;
    }
    return false;
  }
  resolveToken(header: HttpHeaders): Observable<any> {
    return this.http.get(this.url, { headers: header });
  }
}
