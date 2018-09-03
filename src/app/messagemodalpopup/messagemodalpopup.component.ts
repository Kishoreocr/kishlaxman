import { Component, OnInit, ComponentRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { ComponentFixture } from '../../../node_modules/@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../services/egaze.service'
import { jsonpCallbackContext } from '../../../node_modules/@angular/common/http/src/module';
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

  constructor(private fb: FormBuilder, router: Router, route: ActivatedRoute, private EgazeService: EgazeService) {
    this.routerProperty = router;
    this.userFormValue = JSON.parse(sessionStorage.getItem("formData"));
    debugger;
    this.EgazeService.getOTP(this.userFormValue.email).subscribe(otp => {
      this.otpValue = otp;
    });
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.otpValue = this.otpValue;
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
    if (parseInt(this.otpForm.value.otp) === this.otpValue) {
      debugger;
      //this.otpForm.value.otp = "";

      this.EgazeService.registerFun(this.userFormValue).subscribe(result => {
        debugger;
        if (result) {
          this.routerProperty.navigateByUrl('/success-register');
        }
      },
        error => {
          console.log(error);
        }
      );
    }
    else if (this.otpForm.value.otp) {
      this.errorMessage = "Invalid OTP."
    }
    else {
      this.errorValidation = "OTP is required"
    }
  }
} 