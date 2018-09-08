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
    return this.http.post(this.baseUrl + 'signin', data);
  }

  existingUserFun(userId) {
    let requestURL = this.baseUrl + 'validate/' + userId;
    return this.http.get(requestURL);
  }

  getOTP(emialId) {
    let requestURL = this.baseUrl + 'otp/' + emialId + '/REGISTRATION';
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

    return this.http.post(this.baseUrl + 'signup', payloadRequestData);
  }

  forgotuserpwd(userId) {
    return this.http.get(this.baseUrl + 'otp/' + userId + '/FORGOTPASSWORD');
  }

  pwdchange(userpw, useremail) {
    let requestPayload = {
      "email": useremail.emailidForget,
      "password": userpw.newpwd
    }
    return this.http.post(this.baseUrl + 'pwdchange', requestPayload);
  }
}
