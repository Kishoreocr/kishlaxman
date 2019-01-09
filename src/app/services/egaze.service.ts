import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EgazeService {
  //DEV
  private baseUrl: string = 'http://202.153.46.90:8080/egaze-api/';
  //PROD
 // private baseUrl: string = 'https://www.egaze.in/egaze-api/';
  //private baseUrl: string = 'http://localhost:8080/egaze-api/';
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

  getOTP(emialId, mobi) {
    let requestURL = this.baseUrl + 'otp/reg/' + emialId + '/' + mobi;
    return this.http.get(requestURL, { responseType: 'text' });
  }

  registerFun(userObject) {
    let payloadRequestData;
    if (userObject.registerType === 'agent') {
      payloadRequestData = {
        "firstName": userObject.firstName,
        "lastName": userObject.lastName,
        "email": userObject.email,
        "mobile": userObject.mobileNumber,
        "zip": userObject.zipCode,
        "role": userObject.registerType,
        "password": userObject.password,
        "country": userObject.country,
        "countryCode": userObject.countryCode,
        "type": userObject.type,
        "description": userObject.briefDescription
      };

    } else {
      payloadRequestData = {
        "firstName": userObject.firstName,
        "lastName": userObject.lastName,
        "email": userObject.email,
        "mobile": userObject.mobileNumber,
        "zip": userObject.zipCode,
        "role": userObject.registerType,
        "password": userObject.password,
        "country": userObject.country,
        "countryCode": userObject.countryCode,
        "type": userObject.type
      };

    }
    //alert(JSON.stringify(payloadRequestData))
    return this.http.post(this.baseUrl + 'signup', payloadRequestData);
  }

  forgotuserpwd(userId) {
    return this.http.get(this.baseUrl + 'otp/forgot/' + userId);
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

  updateprofile(userObj, id, email, mobileNumber) {
    debugger;
    let requestPayload = {
      "loginId": id,
      "firstName": userObj.firstName,
      "middleName": userObj.middleName,
      "lastName": userObj.lastName,
      "email": email,
      "mobileNo": mobileNumber,
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
      "country": " "
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
    //alert(propetyId)
    formdata.append('file', file);

    return this.http.post(this.baseUrl + "uploadFile/propertydocs/" + propetyId + "/" + userId, formdata);

  }

  getPropertyDocURL(id) {
    return this.baseUrl + 'downloadFile/propertydocs/' + id;

  }
  getPropertyDocViewURL() {
    return this.baseUrl + 'viewFile/propertydocs/';

  }

  getPropertyCommentDocURL(id) {
    return this.baseUrl + 'downloadFile/propertydocs/agent/' + id;

  }
  getPropertyCommentDocViewURL(){
    return this.baseUrl + 'viewFile/propertydocs/agent/' ;

  }
  savePropertyComments(propetyId, userId, agentId, role, description, status, file): Observable<any> {
    let formdata: FormData = new FormData();
    formdata.append('propertyId', propetyId);
    formdata.append('status', status);
    //alert(file)
    formdata.append('file', file);
    // if admin then user id is zero.
    if (role === 'Admin1') {
      formdata.append('userId', "0");
    } else {
      formdata.append('userId', userId);
    }
    if (role === 'Customer') {
      formdata.append('agentId', "0");
    } else {
      formdata.append('agentId', agentId);
    }
    formdata.append('role', role);
    formdata.append('description', description);

    return this.http.post(this.baseUrl + "uploadFile/propertydocs/agent", formdata);

  }

  getPropertyApi() {

    return this.http.get(this.baseUrl + "all/properties");

  }

  updatePropertybyAdmin(objProperty, userId, propertyId, sts) {
    debugger;
    let requestData = {
      'propertyId': propertyId,
      "loginId": userId,
      "propertyType": objProperty.propertyType,
      "propertyHolderName": objProperty.propertyHolderName,
      "relationship": objProperty.relationship,
      "doorNo": objProperty.doorNo,
      "documentNo": objProperty.documentNo,
      "boundaries": 'boundaries',
      "boundariesEast": objProperty.boundariesEast,
      "boundariesNorth": objProperty.boundariesNorth,
      "boundariesWest": objProperty.boundariesWest,
      "boundariesSouth": objProperty.boundariesSouth,
      "mandal": objProperty.mandal,
      "district": objProperty.district,
      "subRegisterOffice": objProperty.subRegisterOffice,
      "extentOfProperty": objProperty.extentOfProperty,
      "address1": objProperty.address1,
      "address2": objProperty.address2,
      "city": objProperty.city,
      "state": objProperty.state,
      "zip": objProperty.zip,
      "country": " ",
      "status": sts
    };
    return this.http.post(this.baseUrl + 'update/property', requestData);

  }
  customerpackage(requestData) {
    return this.http.post(this.baseUrl + 'customerpackage', requestData);

  }
  getPrpopertyDocs(propertyId) {
    return this.http.get(this.baseUrl + "customer/propertydocs/" +
      +propertyId);

  }
  getPrpopertyComments(propertyId) {
    return this.http.get(this.baseUrl + "propertydocs/agent/" +
      +propertyId);

  }
  removePropertyDoc(id) {
    return this.http.delete(this.baseUrl + "customer/propertydocs/delete/" +
      +id);

  }
  savecontactus(requestData) {
    var data = {
      "email": requestData.email,
      "name": requestData.name,
      "description": requestData.description,
      "type": requestData.type,
      "mobileNo": requestData.mobile

    }
    //alert(JSON.stringify(data))
    return this.http.post(this.baseUrl + 'save/contactus', data);
  }
  updatePropertyStatus(propetyId, status): Observable<any> {
    let formdata: FormData = new FormData();
    formdata.append('propertyId', propetyId);
    formdata.append('status', status);
    return this.http.post(this.baseUrl + 'update/property/status', formdata);
  }

  upgradePackageRequest(requestData, email) {
    var data = {
      "email": email,
      "description": requestData.plandetailsField
    }
    // alert(JSON.stringify(data))
    return this.http.post(this.baseUrl + 'upgrade/package', data);
  }
  getCustomPlanUsers() {
    return this.http.get(this.baseUrl + "customplan/user/details")

  }
  createCustomPackage(requestData) {
    let c = requestData.customerCustom;
    let cc = c.split('##');
    var data = {
      "email": cc[1],
      "loginId": cc[0],
      "price": requestData.price,
      "propertyLimit": requestData.packageLimit,
      "propertyPeriod": requestData.packagePeriod,
      "description": requestData.descriptionCustom

    }
    //alert(JSON.stringify(data));
    return this.http.post(this.baseUrl + 'create/package', data);
  }
  getCustomPlanUserRecords() {
    return this.http.get(this.baseUrl + "customer/customplan/details");

  }
  getAllContactUsRequests() {
    return this.http.get(this.baseUrl + "getall/contactus")
  }
  updatecontactus(requestData, freq) {
    var data = {
      "id": freq.id,
      "status": requestData.status,
      "description": requestData.description,
      "type": freq.type
    }
    //alert(JSON.stringify(data));

    return this.http.post(this.baseUrl + 'update/contactus', data);
  }
  getAllContactUsRequestsByStatus(status) {
    return this.http.get(this.baseUrl + "getall/status/contactus/" + status)
  }
  getAllStates() {
    return this.http.get(this.baseUrl + "state/details")
  }
  getDistricts(stateCode) {
    return this.http.get(this.baseUrl + "district/details/" + stateCode)
  }
  getMandals(stateCode, districtCode) {
    return this.http.get(this.baseUrl + "mandal/details/" + stateCode + "/" + districtCode)
  }
  getVillages(stateCode, districtCode, mandalCode) {
    return this.http.get(this.baseUrl + "village/details/" + stateCode + "/" + districtCode + "/" + mandalCode)
  }

  getAgentApprovalDetails() {
    return this.http.get(this.baseUrl + 'agent/details');

  }
  getPropertyUpdates(userId) {
    return this.http.get(this.baseUrl + "updatedproperties/" + userId)
  }
  updatePropertyCommentReadStatus(id) {
    var data = {
      "id": id,
      "status": 'R'
    }
    return this.http.post(this.baseUrl + 'update/propertydocs/agent', data);
  }
  updateAgenapprovalReject(loginId, status) {
    var data = {
      "loginId": loginId,
      "status": status
    }
    return this.http.post(this.baseUrl + 'update/user/status ', data, { responseType: 'text' });
  }
  getSigninOTP(emialId, mobi) {
    let requestURL = this.baseUrl + 'otp/signin/' + emialId + '/' + mobi;
    return this.http.get(requestURL);
  }

  sendpaymnet(data) {
    // const paymentPayload = {
    //   email: data.email,
    //   name: data.name,
    //   phone: data.phone,
    //   productInfo: data.productInfo,
    //   amount: data.amount
    // }
    //alert(data)
    let requestURL = this.baseUrl + 'payment/payment-details';
    return this.http.post(requestURL, data);
  }
  getPackage(id) {
    let requestURL = this.baseUrl + 'packages/' + id;
    return this.http.get(requestURL);
  }
  getAgentDetails() {
    return this.http.get(this.baseUrl + 'active/agent/details');
  }
  getAssignableProperties() {
    return this.http.get(this.baseUrl + 'assignable/properties');
  }
  assignProperty(requestData) {
    let c = requestData.property;
    let cc = c.split('##');
    var data = {
      "propertyId": cc[0],
      "userId": cc[1],
      "agentId": requestData.agent
    }
    //alert(JSON.stringify(data));
    return this.http.post(this.baseUrl + '/assign/property', data);
  }
  getAssignedProperties() {
    return this.http.get(this.baseUrl + 'all/assigned/properties');
  }
  removeAssignedProperty(status, id) {
    var data = {
      "status": status,
      "id": id
    }
    return this.http.post(this.baseUrl + 'update/assigned/property/status', data);
  }
  getAgentProperentties(agentId) {
    return this.http.get(this.baseUrl + 'assigned/properties/'+agentId);
  }
  
}
