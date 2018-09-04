import { Component } from '@angular/core';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { HomeComponent } from './home/home.component';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { SessionstorageService } from './services/sessionstorage.service';
import{ AppConstants} from './services/constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: any;
  flag: boolean = false;
  // navbarOpen = false;
  // toggleNavbar() {
  //   this.navbarOpen = !this.navbarOpen;
  // }
  routerProperty: any;
  activeColor: boolean = false;
  constructor(router: Router, route: ActivatedRoute, private sessionstorageService: SessionstorageService) {

    this.routerProperty = router;
    this.user = JSON.parse(this.sessionstorageService.getUserDetails());
    //alert(typeof this.user)
    if (this.user != null) {
      this.flag = true;
    }
    // if (this.routerProperty.url === '/loginform') {
    //   debugger
    //   this.activeColor = true;
    // }
  }
  logout(){
    this.sessionstorageService.removeUserDetails("user");
    window.location.href=AppConstants.loginURL;
  }
}