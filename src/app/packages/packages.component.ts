import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService,IModalDialogButton } from 'ngx-modal-dialog';
import { PackageconfirmComponent } from '../packageconfirm/packageconfirm.component'

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
  modalService:any;
  viewRef:any;

  constructor(private router: Router,  modalService: ModalDialogService, viewRef: ViewContainerRef) {

    this.modalService = modalService;
    this.viewRef = viewRef;
    //


   }

  ngOnInit() {
    this.planBTab = true;
    //window.location.reload(true);
  }

  packageFun(selected){

    if(selected === 'custom'){
    this.router.navigateByUrl('/userdashboard');
    }
  
    if(selected === 'PLANB' || selected === 'PLANA' || selected === 'PLANC'){
      this.openNewDialog(selected);
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

  openNewDialog(selected) {
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirm Plan choosen?',
      childComponent: PackageconfirmComponent,
      data: selected,settings:{modalClass: 'modal fade ngx-modal blue'}
    });
  }
}
