import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions  } from 'ngx-modal-dialog';

@Component({
  selector: 'app-packageconfirm',
  templateUrl: './packageconfirm.component.html',
  styleUrls: ['./packageconfirm.component.css']
})
export class PackageconfirmComponent implements OnInit {

  constructor(private router: Router, private modalService: ModalDialogService) {

   }

  ngOnInit() {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
  
  }
confirmPackage(){
  this.router.navigateByUrl('/userdashboard');
}

}
