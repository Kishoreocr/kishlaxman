import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  planATab:boolean=false;
  planBTab:boolean=false;
  planCTab:boolean=false;
  activeTabflag:boolean=false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.planBTab = true;
  }

  packageFun(selected){
    if(selected === 'custom'){
    this.router.navigateByUrl('/userdashboard');
    }
  
    if(selected === 'PLANB' || selected === 'PLANA' || selected === 'PLANC'){
      this.router.navigateByUrl('/userdashboard');
    }

  }


  plansTabFun(activeTab) {
    //this.activeSelected = true;
    switch (activeTab) {
      case 'PLANA':
        this.planATab = true;
        this.planBTab = false;
        this.planCTab = false;
        break;
      case 'PLANB':
      this.planATab = false;
      this.planBTab = true;
      this.planCTab = false;
        break;
      case 'PLANC':
      this.planATab = false;
      this.planBTab = false;
      this.planCTab = true;
        break;
      default:
     
      this.planBTab = true;
     
    }

  }

}
