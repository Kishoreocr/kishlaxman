import { Component, OnInit, ComponentRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { ComponentFixture } from '../../../node_modules/@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton } from 'ngx-modal-dialog';
import { text } from '../../../node_modules/@angular/core/src/render3/instructions';
import { Pwdvalidation } from '../pwdvalidation';
import { EgazeService } from '../services/egaze.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
import { interval } from 'rxjs/observable/interval';
import { ModalPropertyService } from '../services/modal-property.service';

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

  showText: boolean;
  showIconEye: boolean = false;
  hideIconEye: boolean = false;

  showText1: boolean;
  showIconEye1: boolean = false;
  hideIconEye1: boolean = false;
  timerOn = true;
  resend:any=false;
  constructor(private ModalPropertyService: ModalPropertyService,private fb: FormBuilder, router: Router, route: ActivatedRoute, modalService: ModalDialogService, private Pwdvalidation: Pwdvalidation, private EgazeService: EgazeService) {
    this.routerProperty = router;
    this.modalService = modalService;
    // this.actionButtons = [
    //   { text: 'Close' }, // no special processing here
    //   { text: 'I will always close', onAction: () => true },
    //   { text: 'I never close', onAction: () => false }
    // ];

    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;

    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;
  }

  pswdstrong(control: AbstractControl): any {
    // alert(control.value)
     let hasNumber = /\d/.test(control.value);
     let hasUpper = /[A-Z]/.test(control.value);
     let hasLower = /[a-z]/.test(control.value);
      //console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
     const valid = hasNumber && hasUpper && hasLower;
     if (!valid) {
         // return what´s not valid
         return { pwdstrong: true };
     }
     return ;
 }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.newpwdForm = this.fb.group({
      newpwd: ['', [Validators.required, Validators.minLength(4),this.pswdstrong]],
      confirmnewpwd: ['', [Validators.required, Validators.minLength(4), this.passwordConfirming,this.pswdstrong]]
    })
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.userForgtForm = this.fb.group({
      emailidForget: ['', [Validators.required, Validators.pattern(emailPattern)]]
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
      newpwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmnewpwd: ['', [Validators.required, Validators.minLength(6), this.passwordConfirming]]
    })
  }
  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get('newpwd');
    const cpwd = c.parent.get('confirmnewpwd')

    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
      return { notSame: true };

    }

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

    if (this.newpwdForm.valid) {
      this.isLoaderdiv = true;
      if (this.newpwdForm.value.newpwd === this.newpwdForm.value.confirmnewpwd) {

        this.EgazeService.pwdchange(this.newpwdForm.value, this.userForgtForm.value).subscribe(result => {
          this.isLoaderdiv = false;
          if (result) {
            this.pwschanged = "Successfully password has been changed. Please LOGIN with new password.";
            this.errorMessage = '';
            let this_ = this;

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
        this.notmatchpwd = "New password and confirm password must be match"
      }
    }
  }
  emai:any;
  userIdforget(userId): void {
    this.submitted = true;
    this.emailnotExists = '';
    this.emai=userId.value.emailidForget;
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
            this.timer(300);

          },
            error => {
              this.isLoaderdiv = false;
              this.serverError = 'Server error has occurred, Please try later.'
            });
        }
        else {
          this.isLoaderdiv = false;
          this.emailnotExists = 'Sorry, The registered email does not exists'
        }
      },
        error => {
          this.isLoaderdiv = false;
          this.serverError = 'Server error has occurred, Please try later.'
        }
      );
    }


  }




  showTextPwd(registerForm) {
    if (registerForm.value.newpwd) {
      this.showText = !this.showText;
      this.showIconEye = !this.showIconEye;
      this.hideIconEye = !this.hideIconEye;
    }
  }

  showTextPwd1(registerForm) {
    if (registerForm.value.confirmnewpwd) {
      this.showText1 = !this.showText1;
      this.showIconEye1 = !this.showIconEye1;
      this.hideIconEye1 = !this.hideIconEye1;
    }
  }
  mouseoverpwd() {
    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;
  }
  mouseoverpwd1() {
    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;
  }
  m: any;
  s: any;
  timerd: any="05:00";
  sub:any;
  timer(remaining) {
    var  source = interval(1000);
    //output: 0,1,2,3,4,5....
    //alert(remaining)
    if(parseInt(remaining)  > 0 ){
    this.sub=source.subscribe(val => {
      
      if(parseInt(remaining)  > 0 ){
      this.m = Math.floor(remaining / 60);
      this.s = remaining % 60;

      this.m = this.m < 10 ? '0' + this.m : this.m;
      this.s = this.s < 10 ? '0' + this.s : this.s;

      this.timerd = this.m + ':' + this.s;
      remaining -= 1;
      this.timer1(remaining);
      }else{
      //  alert("ss")
        this.resend=true;
        this.sub.unsubscribe();
        return ;
      }
    
    },err => {
     // alert("ss"+err)
    }
);
  }else{
    //alert("ss")
    return;
  }
  }
  timer1(remaining) {
    this.m = Math.floor(remaining / 60);
    this.s = remaining % 60;

    this.m = this.m < 10 ? '0' + this.m : this.m;
    this.s = this.s < 10 ? '0' + this.s : this.s;

    this.timerd = this.m + ':' + this.s;
    remaining -= 1;
    
    //alert(remaining)
  }
  resendotp(){
    this.isLoaderdiv = true;
   
   // this.emai="madishetty.kishore@gmail.com";
          this.EgazeService.forgotuserpwd(this.emai).subscribe(result => {
            this.isLoaderdiv = false;
            this.updateOTP = result;
            this.resend=false;
            this.timer(300);
          },
            error => {
              this.isLoaderdiv = false;
              this.serverError = 'Server error has occurred, Please try later.'
            });
  }
  closeModal(id: string) {
    this.ModalPropertyService.close(id);
  }
} 