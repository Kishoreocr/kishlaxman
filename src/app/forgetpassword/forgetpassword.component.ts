import { Component, OnInit, ComponentRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { ComponentFixture } from '../../../node_modules/@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton } from 'ngx-modal-dialog';
import { text } from '../../../node_modules/@angular/core/src/render3/instructions';
import { Pwdvalidation } from '../pwdvalidation';
import { EgazeService } from '../services/egaze.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [Pwdvalidation]
})

export class ForgetpasswordComponent implements OnInit, IModalDialog {
  actionButtons: IModalDialogButton[];
  otpForm: FormGroup;
  newpwdForm: FormGroup;
  userForgtForm: FormGroup;
  submitted: boolean = false;
  routerProperty: any;
  errorMessage: string;
  errorValidation: string;
  passwordAccess: boolean = false;
  otphide: boolean = false;
  useridForget: boolean = true;
  newpwdSubmitted: boolean = false;
  pwschanged: string = '';
  modalService: any;
  comparepwd: any;
  notmatchpwd: string;
  isLoaderdiv: boolean = false;
  serverError: string = '';
  emailnotExists: string = '';
  updateOTP: any = '';

  constructor(private fb: FormBuilder, router: Router, route: ActivatedRoute, modalService: ModalDialogService, private Pwdvalidation: Pwdvalidation, private EgazeService: EgazeService) {
    this.routerProperty = router;
    this.modalService = modalService;
    // this.actionButtons = [
    //   { text: 'Close' }, // no special processing here
    //   { text: 'I will always close', onAction: () => true },
    //   { text: 'I never close', onAction: () => false }
    // ];
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.newpwdForm = this.fb.group({
      newpwd: ['', Validators.required],
      confirmnewpwd: ['', Validators.required]
    });

    this.userForgtForm = this.fb.group({
      emailidForget: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.otpForm.controls; }
  get pwdf() { return this.newpwdForm.controls; }
  get frgf() { return this.userForgtForm.controls; }


  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    // this.OTPSave();
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.newpwdForm = this.fb.group({
      newpwd: ['', Validators.required],
      confirmnewpwd: ['', Validators.required]
    })
  }

  OTPSave() {
    this.submitted = !this.submitted;
    if (parseInt(this.otpForm.value.otp) === this.updateOTP) {
      //this.routerProperty.navigateByUrl('/success-register');
      this.otpForm.value.otp = "";
      this.passwordAccess = true;
      this.otphide = false;
      this.errorMessage = '';

    }
    else if (this.otpForm.value.otp) {
      this.errorMessage = "Invalid OTP."
    }
    else {
      this.errorValidation = "OTP is required"
    }
  }

  newpwdSave(value) {
    // this.Pwdvalidation.MatchPassword(value).then((value) => {
    //   this.comparepwd = value;
    // });
    this.newpwdSubmitted = true;
    this.isLoaderdiv = true;
    if (this.newpwdForm.valid) {

      if (this.newpwdForm.value.newpwd === this.newpwdForm.value.confirmnewpwd) {

        this.EgazeService.pwdchange(this.newpwdForm.value, this.userForgtForm.value).subscribe(result => {
          this.isLoaderdiv = false;
          if (result) {
            this.pwschanged = "Successfully password has been changed. Please LOGIN with new password.";
            this.errorMessage = '';
            let this_ = this;
            // this.actionButtons[1].onAction();
            setTimeout(function () {
              //this_.routerProperty.navigateByUrl('/registerform');
              //window.location.href = '/loginform'
              window.location.reload(true);

            }, 2000);
          }
        },
          error => {
            this.isLoaderdiv = false;
            this.errorMessage = 'Server error has occurred. Please try later.'
          }
        );
      }
      else {
        this.isLoaderdiv = false;
        this.notmatchpwd = "Confirm Password does not match."
      }
    }
  }

  userIdforget(userId): void {
    this.submitted = true;
    this.emailnotExists = '';
    if (this.userForgtForm.valid) {
      this.isLoaderdiv = true;

      this.EgazeService.existingUserFun(userId.value.emailidForget).subscribe(result => {
        this.isLoaderdiv = false;
        if (result) {
          this.isLoaderdiv = true;

          this.EgazeService.forgotuserpwd(userId.value.emailidForget).subscribe(result => {
            this.isLoaderdiv = false;
            this.otphide = true;
            this.passwordAccess = false;
            this.useridForget = false;
            this.submitted = false;

            this.updateOTP = result;

          },
            error => {
              this.isLoaderdiv = false;
              this.serverError = 'Server error has occurred, Please try later.'
            });
        }
        else {
          this.isLoaderdiv = false;
          this.emailnotExists = 'Sorry, This email not exists.'
        }
      },
        error => {
          this.isLoaderdiv = false;
          this.serverError = 'Server error has occurred, Please try later.'
        }
      );
    }


  }

} 