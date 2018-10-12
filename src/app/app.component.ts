import { Component, OnInit, HostListener } from '@angular/core';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { HomeComponent } from './home/home.component';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { SessionstorageService } from './services/sessionstorage.service';
import { AppConstants } from './services/constants'
import { EgazeService } from './services/egaze.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: Object = { loginId: Number, email: String, role: String, status: String };
  flag: boolean = false;
  user1: any;
  // navbarOpen = false;
  // toggleNavbar() {
  //   this.navbarOpen = !this.navbarOpen;
  // }
  routerProperty: any;
  activeColor: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,router: Router, route: ActivatedRoute, private sessionstorageService: SessionstorageService, private EgazeService: EgazeService) {

    this.routerProperty = router;
    this.user = this.sessionstorageService.getUserDetails();
    if (this.user != null) {
      this.user = JSON.parse(this.user + "");
      //  alert(this.user)
      this.flag = true;
    }
  }


  userdashboard() {
    if (this.sessionstorageService.getUserDetails() != null) {
      this.user1 = JSON.parse(this.sessionstorageService.getUserDetails() + "");
      this.EgazeService.getCustomerPackages(this.user1.loginId).subscribe(
        result => {
          if (Object.keys(result).length === 0) {
            window.location.href = AppConstants.packageURL;
          } else {
            window.location.href = AppConstants.userdashboardURL;
          }
        }

      );
    }
  }
  logout() {
    this.sessionstorageService.removeUserDetails("user");
    window.location.href = AppConstants.loginURL;
  }

  ngOnInit() {
    const path = this.activatedRoute.snapshot.queryParams['path'];
const navigateTo = '/' + path;

if (path) {
    window.location.href=navigateTo;

}
    this.routerProperty.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  showUparrow: boolean = false;
  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (window.pageYOffset > 100) {
      this.showUparrow = true;
    }
    else {
      this.showUparrow = false;
    }
  }
}