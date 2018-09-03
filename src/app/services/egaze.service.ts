import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EgazeService {
  private baseUrl: string = 'http://43.225.26.98:8080/egaze-api/';
  constructor(private http: HttpClient) { }


  loginFun(loginForm) {
    debugger;
    let data = { 
      "email": loginForm.value.username,
      "password": loginForm.value.userpwd
  }
    return this.http.post(this.baseUrl + 'user/signin', data);
  }

  existingUserFun(userId) {
    // http://localhost:8080/egaze-api/user/validate/kishore11@gmail.com
    let requestURL = this.baseUrl + 'user/validate/' + userId;
    return this.http.get(requestURL);
  }

  getOTP(emialId) {
    let requestURL = this.baseUrl + 'user/otp/' + emialId + '/REGISTRATION';
    return this.http.get(requestURL);
  }

  registerFun(userObject) {
    let payloadRequestData = {
      "firstName": userObject.firstName,
      "lastName": userObject.lastName,
      "email": userObject.email,
      "mobile": userObject.mobileNumber,
      "zip": userObject.zipCode,
      "role": "user",
      "password": userObject.password
    };

    return this.http.post(this.baseUrl + 'user/signup', payloadRequestData);
  }




}
