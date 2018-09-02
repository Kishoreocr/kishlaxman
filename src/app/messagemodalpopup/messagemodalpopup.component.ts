import { Component, OnInit, ComponentRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { ComponentFixture } from '../../../node_modules/@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
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
  constructor(private fb: FormBuilder, router: Router, route: ActivatedRoute) {
    this.routerProperty = router;
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.otpForm.controls; }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    // this.OTPSave();
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  OTPSave() {
    this.submitted = true;
    if (this.otpForm.value.otp === '1234') {
      this.routerProperty.navigateByUrl('/success-register');
      this.otpForm.value.otp = "";
    }
    else if (this.otpForm.value.otp) {
      this.errorMessage = "Invalid OTP."
    }
    else {
      this.errorValidation = "OTP is required"
    }
  }
} 