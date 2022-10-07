import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup-two',
  templateUrl: './signup-two.component.html',
  styleUrls: ['./signup-two.component.scss'],
})
export class SignupTwoComponent implements OnInit {
  constructor(private http: HttpClient) {}
  isAlert: boolean = false;
  isAccountCreated: boolean = false;
  alertMessage: String = '';
  alertType: String = '';
  signupData: any = {
    name: '',
    emailId: '',
    username: '',
    organizationName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    gstNumber: '',
    password: '',
  };

  ngOnInit(): void {}

  onNext(data: any) {
    if (data.value.password === data.value.cPassword && data.valid) {
      console.log('I got executed');
      var localData = JSON.parse(localStorage.getItem('data') || '{}');
      this.signupData = {
        name: localData.contactPerson,
        emailId: data.value.emailId,
        username: data.value.username,
        organizationName: localData.organizationName,
        phoneNumber: localData.contactNumber,
        address1: localData.address1,
        address2: localData.address2,
        city: localData.city,
        gstNumber: data.value.gstNumber,
        password: data.value.password,
      };
      this.resolveNewUser(this.signupData).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.clear();
          this.isAccountCreated = true;
        },
        error: (err: any) => {
          console.error(err);
          if (err.status === 500) {
            this.isAlert = true;
            this.alertType = 'danger';
            this.alertMessage =
              'Oops, Seems like something went south, please try again later';
          } else {
            this.isAlert = true;
            this.alertType = 'danger';
            this.alertMessage = err.error;
          }
        },
      });
    }
  }
  resolveNewUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:8004/signup', userData);
  }
}
