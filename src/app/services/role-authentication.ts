import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SessionstorageService } from '../services/sessionstorage.service';

@Injectable()
export class RoleAuthenticationService implements CanActivate {
  user: any;
  constructor(private sessionstorageService: SessionstorageService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    let expectedRoleArray = route.data;
    //alert(expectedRoleArray)

    expectedRoleArray = expectedRoleArray.expectedRole;

    let expectedRole = '';

    // for(let i=0; i<expectedRoleArray.length; i++){
    //   if(expectedRoleArray[i]==tokenPayload.role){
    //     console.log("Roles Matched");
    //     expectedRole = tokenPayload.role;
    //   }
    // }
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");

    //alert(expectedRoleArray)
    if (this.user!=null && this.user.role == expectedRoleArray) {
      //console.log("User permitted to access the route");
      return true;
    }
    

    this.router.navigate(['unauthorized']);
    return false;
  }
}
