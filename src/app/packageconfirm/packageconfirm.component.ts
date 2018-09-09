import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions  } from 'ngx-modal-dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionstorageService } from '../services/sessionstorage.service';

@Component({
  selector: 'app-packageconfirm',
  templateUrl: './packageconfirm.component.html',
  styleUrls: ['./packageconfirm.component.css']
})
export class PackageconfirmComponent implements OnInit, IModalDialog  {
plan:String;
actionButtons: IModalDialogButton[];
data:string[];
user:any;
isLoading: boolean;

private baseUrl: string = 'http://43.225.26.98:8080/egaze-api/';

  constructor(private router: Router, private modalService: ModalDialogService,private sessionstorageService: SessionstorageService,private http: HttpClient) {
    
    this.user =JSON.parse(this.sessionstorageService.getUserDetails()+"");

   }

  ngOnInit() {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
  this.data=options.data.split("$$");
  this.plan=this.data[0];
  // if(this.data[0] === 'PLANB'){
  //   this.plan="Yearly";

  // }else if(this.data[0] === 'PLANA'){
  //   this.plan="Monthly";
  // }
  //  else if(this.data[0] === 'PLANC'){

  //   this.plan="Custom";
  //  } 
   this.actionButtons = [
    { text: 'Confirm' , onAction: () =>  this.confirmPackage()
  },{ text: 'Cancel', onAction: () => true },

  ];
  }
confirmPackage(){
  let data1 ={
    "loginId": this.user.loginId,
    "email": this.user.email,
    "packageId": this.data[1]
 
}
//alert(this.user.email);
this.isLoading = true;

   this.http.post(this.baseUrl + 'customerpackage', data1).subscribe(
    result => {
      if (result==true) {
        this.isLoading = false;
        this.router.navigateByUrl('/userdashboard');

      }
    }

  );
}

}
