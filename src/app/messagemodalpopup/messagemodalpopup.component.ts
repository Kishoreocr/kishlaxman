import { Component, OnInit, ComponentRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { ComponentFixture } from '../../../node_modules/@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../services/egaze.service'
import { jsonpCallbackContext } from '../../../node_modules/@angular/common/http/src/module';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
@Component({
  selector: 'app-messagemodalpopup',
  templateUrl: './messagemodalpopup.component.html',
  styleUrls: ['./messagemodalpopup.component.css']
})
export class MessagemodalpopupComponent implements OnInit, IModalDialog {
  otpForm: FormGroup;
  submitted: boolean = false;
  routerProperty: any;
  errorMessage: string;
  errorValidation: string;
  parentFormdata: any;
  otpValue: any;
  userFormValue: any;
  isLoading: boolean;

  constructor(private fb: FormBuilder, router: Router, route: ActivatedRoute, private EgazeService: EgazeService) {
    this.routerProperty = router;
    this.userFormValue = JSON.parse(sessionStorage.getItem("formData"));
    //debugger;
    this.isLoading = true;
    
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.otpValue = this.otpValue;
    if(this.userFormValue!== null){
    
    this.EgazeService.getOTP(this.userFormValue.email,this.userFormValue.mobileNumber).subscribe(otp => {
      this.isLoading = false;
      this.otpValue = otp;
    });
      
  }
  }
  // convenience getter for easy access to form fields
  get f() { return this.otpForm.controls; }



  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    // this.OTPSave();
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    //this.parentFormdata = options.data;
  
  }

  OTPSave() {
    this.submitted = true;
    this.isLoading = true;
    if (parseInt(this.otpForm.value.otp) === this.otpValue) {
      debugger;
      //this.otpForm.value.otp = "";
      this.EgazeService.registerFun(this.userFormValue).subscribe(result => {
        this.isLoading = false;
        if (result) {
          sessionStorage.removeItem("formData");
          sessionStorage.setItem("regsuc","success");

          this.routerProperty.navigateByUrl('/loginform');
        }
      },
        error => {
          this.isLoading = false;
          console.log(error);
        }
      );
    }
    else if (this.otpForm.value.otp) {
      this.isLoading = false;
      this.errorMessage = "Invalid OTP."
    }
    else {
      this.isLoading = false;
      this.errorValidation = "OTP is required"
    }
  }
} 