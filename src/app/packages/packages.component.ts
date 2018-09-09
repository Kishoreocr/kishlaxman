import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton } from 'ngx-modal-dialog';
import { PackageconfirmComponent } from '../packageconfirm/packageconfirm.component'
import { EgazeService } from '../services/egaze.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  MONTHLY: boolean = false;
  YEARLY: boolean = false;
  CUSTOM: boolean = false;
  activeflag: boolean = false;
  modalService: any;
  viewRef: any;
  isLoading: boolean = true;
  packages: any;


  constructor(private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService) {

    this.modalService = modalService;
    this.viewRef = viewRef;
    this.EgazeService.getPackages().subscribe(
      result => {
        this.isLoading=false;
        this.packages = result;

      }

    );


  }

  ngOnInit() {
    this.YEARLY = true;
    //window.location.reload(true);
  }
  addActiveClass(id){
    //alert(id+"")
    return {
      'active-package-tab': id
      };
   }
  packageFun(selected, id) {

    // if (selected === 'custom') {
    //   this.router.navigateByUrl('/userdashboard');
    // }
   
    if (selected === 'CUSTOM' || selected === 'YEARLY' || selected === 'MONTHLY') {
      this.openNewDialog(selected, id);
    }
  }


  plansTabFun(active) {
    //this.activeSelected = true;
    switch (active) {
      case 'MONTHLY':
        this.MONTHLY = true;
        this.YEARLY = false;
        this.CUSTOM = false;
        break;
      case 'YEARLY':
        this.MONTHLY = false;
        this.YEARLY = true;
        this.CUSTOM = false;
        break;
      case 'CUSTOM':
        this.MONTHLY = false;
        this.YEARLY = false;
        this.CUSTOM = true;
        break;
      default:

        this.YEARLY = true;

    }

  }

  openNewDialog(selected, id) {
    //alert(selected + "$$" + id)
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirm Plan choosen?',
      childComponent: PackageconfirmComponent,
      data: selected + "$$" + id, settings: { modalClass: 'modal fade ngx-modal blue' }
    });
  }
}
