import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SlideInOutAnimation } from '../animations';
import { SessionstorageService } from '../services/sessionstorage.service';
import { AppConstants } from '../services/constants'
import { EgazeService } from '../services/egaze.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [SlideInOutAnimation]
})
export class HeaderComponent implements OnInit {

  isScollDown: boolean = false;
  animationState = 'in';
  flag: boolean = false;
  user1:any;
  user: Object = { loginId: Number, email: String, role: String, status: String };
  constructor(private _eref: ElementRef,private sessionstorageService: SessionstorageService,private EgazeService: EgazeService) { 
    this.user = this.sessionstorageService.getUserDetails();
    if (this.user != null) {
      this.user = JSON.parse(this.user + "");
      //  alert(this.user)
      this.flag = true;
    }

  }

  ngOnInit() {
  }

 bgColorchange = false;
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      debugger;
      this.bgColorchange = true;
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
     
    }
  }
  closeSidebar(divName: string){
    this.bgColorchange = false;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';

  }
  userdashboard() {
    if (this.sessionstorageService.getUserDetails() != null) {
      this.user1= JSON.parse(this.sessionstorageService.getUserDetails() + "");
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

  // @HostListener('document:click', ['$event']) 
  // clickedOutside($event){
   
  //   if (!this._eref.nativeElement.contains(event.target)){
  //   this.bgColorchange = false;
  //   this.animationState = this.animationState === 'out' ? 'in' : 'out';
  //   }
  // }


  @HostListener('window:scroll', ['$event'])
  headerStick(event) {
    if (window.pageYOffset > 100) {
      this.isScollDown = true;
    }
    else {
      this.isScollDown = false;
    }
  }

}
