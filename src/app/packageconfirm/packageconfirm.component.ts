import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions  } from 'ngx-modal-dialog';

@Component({
  selector: 'app-packageconfirm',
  templateUrl: './packageconfirm.component.html',
  styleUrls: ['./packageconfirm.component.css']
})
export class PackageconfirmComponent implements OnInit, IModalDialog  {
plan:String;
actionButtons: IModalDialogButton[];

  constructor(private router: Router, private modalService: ModalDialogService) {
    this.actionButtons = [
      { text: 'Confirm' , onAction: () =>   this.router.navigateByUrl('/userdashboard')
    },{ text: 'Cancel', onAction: () => true },

    ];
   }

  ngOnInit() {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
  this.plan=options.data;
  if(this.plan === 'PLANB'){
    this.plan="Yearly";

  }else if(this.plan === 'PLANA'){
    this.plan="Monthly";
  }
   else if(this.plan === 'PLANC'){

    this.plan="Custom";
   } 
  }
confirmPackage(){
  this.router.navigateByUrl('/userdashboard');
}

}
