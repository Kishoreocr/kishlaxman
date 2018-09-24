import { Component, OnInit  } from '@angular/core';
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
export class AppComponent implements OnInit{
  title = 'app';
  user: Object={loginId: Number, email: String, role: String, status: String };
  flag: boolean = false;
  // navbarOpen = false;
  // toggleNavbar() {
  //   this.navbarOpen = !this.navbarOpen;
  // }
  routerProperty: any;
  activeColor: boolean = false;
  constructor(router: Router, route: ActivatedRoute, private sessionstorageService: SessionstorageService) {

    this.routerProperty = router;
    this.user =this.sessionstorageService.getUserDetails();
    if (this.user != null) {
      this.user=JSON.parse(this.user+"");
    //  alert(this.user)
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

  ngOnInit() {
    this.routerProperty.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}
  
}