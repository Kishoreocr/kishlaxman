import { Injectable } from '@angular/core';

@Injectable()
export class SessionstorageService {

  constructor() { }

  getUserDetails() {
    return localStorage.getItem("user");
  }
  setUserDetails(key) {
    return localStorage.setItem("user", key);
  }
  removeUserDetails(key) {
    localStorage.removeItem(key);
    localStorage.clear();
  }

}
