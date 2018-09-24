import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EgazeService {
  //private baseUrl: string = 'http://43.225.26.98:8080/egaze-api/';
  private baseUrl: string = 'http://localhost:8080/egaze-api/';
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
      "role": userObject.registerType,
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
    return this.http.post(this.baseUrl + 'forgotpwdchange', requestPayload);
  }

  getprofile(id) {
    return this.http.get(this.baseUrl + 'profile/' + id);
  }

  updateprofile(userObj, id) {
    debugger;
    let requestPayload = {
      "loginId": id,
      "firstName": userObj.firstName,
      "middleName": userObj.middleName,
      "lastName": userObj.lastName,
      "email": userObj.email,
      "mobileNo": userObj.mobileNumber,
      "address1": userObj.address1,
      "address2": userObj.address2,
      "address3": userObj.address3,
      "city": userObj.city,
      "state": userObj.state,
      "zip": userObj.zipCode,
      "country": userObj.country,
    }

    return this.http.post(this.baseUrl + 'profileupdate', requestPayload);

  }

  getAlerts(id) {
    return this.http.get(this.baseUrl + 'alerts/' + id);
  }
  getCustomerPackages(id) {
    return this.http.get(this.baseUrl + 'customerpackages/' + id);
  }
  getPackages() {
    return this.http.get(this.baseUrl + 'packages');
  }

  addProperty(objProperty, userId, email) {
    let propertyDetails = {
      "loginId": userId,
      "email": email,
      "propertyType": objProperty.typeofProperty,
      "propertyHolderName": objProperty.titleHolder,
      "relationship": objProperty.relationshipTocustomer,
      "doorNo": objProperty.surveyNoDrNo,
      "documentNo": objProperty.documentNo,
      "boundaries": '',
      "boundariesEast": objProperty.boundariesEast,
      "boundariesNorth": objProperty.boundariesNorth,
      "boundariesWest": objProperty.boundariesWest,
      "boundariesSouth": objProperty.boundariesSouth,
      "mandal": objProperty.mandal,
      "district": objProperty.district,
      "subRegisterOffice": objProperty.subRegisterOffice,
      "extentOfProperty": objProperty.extentofProperty,
      "address1": objProperty.address1,
      "address2": objProperty.address2,
      "city": objProperty.villageCity,
      "state": objProperty.state,
      "zip": objProperty.zip,
      "country": objProperty.country
    };
    //alert(JSON.stringify(propertyDetails));
    return this.http.post(this.baseUrl + 'add/property', propertyDetails);

  }

  getAllproperties(userId) {
    return this.http.get(this.baseUrl + 'properties/' + userId);
  }

  profilechndpwd(objData, userEmail) {
    let requestData = {
      "email": userEmail,
      "newPassword": objData.newpwd,
      "password": objData.oldpwd
    }
    //alert(requestData)
    return this.http.post(this.baseUrl + 'profile/pwdchange', requestData, { responseType: 'text' });

  }
  getCustomerPackageLatestRecord(id) {
    return this.http.get(this.baseUrl + 'customerpackages/latest/' + id);

  }
  getCustomerDetails() {
    return this.http.get(this.baseUrl + 'customer/details');

  }
  savePropertyDoc(file, propetyId, userId): Observable<any> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.http.post(this.baseUrl + "uploadFile/propertydocs/" + propetyId + "/" + userId, formdata);

  }

  getPropertyDocURL(id) {
    return this.baseUrl + 'downloadFile/propertydocs/' + id;

  }

  savePropertyComments(propetyId, userId,agentId,role,description): Observable<any> {
    let formdata: FormData = new FormData();
    formdata.append('propetyId', propetyId);
    // if admin then user id is zero.
    formdata.append('userId', userId);

    formdata.append('agentId', agentId);
    formdata.append('role', role);
    formdata.append('description', description);

    return this.http.post(this.baseUrl + "uploadFile/propertydocs/agent", formdata);

  }

  getPropertyApi(){

   return this.http.get(this.baseUrl + "all/properties");

  }

  updatePropertybyAdmin(objProperty,userId, propertyId){
    debugger;
    let requestData = {
      'propertyId':propertyId,
      "loginId": userId,
      "propertyType": objProperty.typeofProperty,
      "propertyHolderName": objProperty.titleHolder,
      "relationship": objProperty.relationshipTocustomer,
      "doorNo": objProperty.surveyNoDrNo,
      "documentNo": objProperty.documentNo,
      "boundaries": '',
      "boundariesEast": objProperty.boundariesEast,
      "boundariesNorth": objProperty.boundariesNorth,
      "boundariesWest": objProperty.boundariesWest,
      "boundariesSouth": objProperty.boundariesSouth,
      "mandal": objProperty.mandal,
      "district": objProperty.district,
      "subRegisterOffice": objProperty.subRegisterOffice,
      "extentOfProperty": objProperty.extentofProperty,
      "address1": objProperty.address1,
      "address2": objProperty.address2,
      "city": objProperty.villageCity,
      "state": objProperty.state,
      "zip": objProperty.zip,
      "country": objProperty.country
    };
    return this.http.post(this.baseUrl + 'egaze-api/update/property', requestData);

  }
  customerpackage(requestData) {
    return this.http.post(this.baseUrl + 'customerpackage', requestData);

  }
  getPrpopertyDocs(customerId,propertyId) {
    return this.http.get(this.baseUrl + "customer/propertydocs/"+customerId+"/"
    +propertyId);

  }
}
