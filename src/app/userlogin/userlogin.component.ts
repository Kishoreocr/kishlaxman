import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Userdata } from '../userdata';
import { FormBuilder, Validators, FormGroup,AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from '../messagemodalpopup/messagemodalpopup.component';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { AppConstants } from '../services/constants';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ModalPropertyService } from '../services/modal-property.service';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  userLoginObj: Userdata = {
    username: '',
    userpwd: ''
  };
  //userloginForm:any;
  userloginForm: FormGroup;
  submitted = false;
  routerProperty: any;
  activeColor: boolean = false;
  loginAttemptcount: number = 5;
  disabledField: boolean = false;
  attemptloginMessage: string;
  modalService: any;
  viewRef: any;
  invalidCredential: string;
  user: any;
  isLoading: boolean;
  msg: any;
  user1: any;
  registrationsuccess: any = "";
  showText: boolean;
  showIconEye: boolean = false;
  hideIconEye: boolean = false;
  otpForm: FormGroup;
  updateOTP: any = '';
  errorMessage: any;
  timerOn = true;
  resend: any = false;

  otpForm1: FormGroup;
  newpwdForm: FormGroup;
  userForgtForm: FormGroup;
  serverError: string = '';
  emailnotExists: string = '';
  passwordAccess: boolean = false;
  otphide: boolean = false;
  useridForget: boolean = true;
  errorValidation: string;
  newpwdSubmitted: boolean = false;
  pwschanged: string = '';
  notmatchpwd: string;

  submitted1= false;
  submitted2 = false;


  showText1: boolean;
  showIconEye1: boolean = false;
  hideIconEye1: boolean = false;
  showText2: boolean;
  showIconEye2: boolean = false;
  hideIconEye2: boolean = false;

  constructor(private fb: FormBuilder, router: Router, private route: ActivatedRoute, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, private http: HttpClient, private ModalPropertyService: ModalPropertyService) {
    this.disabledField = false;
    this.routerProperty = router;
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.sessionstorageService.removeUserDetails("user");

    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;

    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;

    this.showText2 = false;
    this.showIconEye2 = false;
    this.hideIconEye2= true;

    // if (this.routerProperty.url === '/loginform')
    //       {
    //         this.activeColor = true;
    //       }
  }

  // this.userloginForm = this.fb.group({
  //   username: ['', Validators.required],
  //   userpwd: ['', Validators.required],
  // });

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.disabledField = false;
    this.route.queryParamMap.subscribe(params => {
      if (params.get('data') === 'success') {
        this.registrationsuccess = "success";
      } else {
        ;
        this.registrationsuccess = ""
      }
    });
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.userloginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(emailPattern)]],
      userpwd: ['', [Validators.required]] //, Validators.minLength(6)
    });

    this.otpForm1 = this.fb.group({
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
 passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('newpwd');
  const cpwd = c.parent.get('confirmnewpwd')

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    return { notSame: true };

  }

}

  // convenience getter for easy access to form fields
  get f() { return this.userloginForm.controls; }
  get f1() { return this.otpForm.controls; }

  get f2() { return this.otpForm1.controls; }
  get pwdf() { return this.newpwdForm.controls; }
  get frgf() { return this.userForgtForm.controls; }
  OTPSave() {
    this.submitted = !this.submitted;

    if (parseInt(this.otpForm.value.otp) === this.updateOTP) {
      //this.routerProperty.navigateByUrl('/success-register');
      this.otpForm.value.otp = "";
      this.errorMessage = '';
      this.isLoading = true;
      this.redirect();
      this.userloginForm.value.username = "";
      this.userloginForm.value.userpwd = "";
    }
    else if (this.otpForm.value.otp) {
      this.errorMessage = "Invalid OTP."
    }

  }

  redirect() {
    this.user1 = '';
    this.user1 = JSON.parse(this.sessionstorageService.getUserDetails() + "");

    if (this.user1.role === 'customer') {
      this.EgazeService.getCustomerPackages(this.user1.loginId).subscribe(
        result => {
          if (Object.keys(result).length === 0) {
            this.isLoading = false;
            window.location.href = AppConstants.packageURL;

          } else {
            window.location.href = AppConstants.userdashboardURL;
          }
        }

      );
    }

    if (this.user1.role === 'agent') {
      window.location.href = AppConstants.AgentloginURL;
    }
  }
  saveUser(userloginForm) {
    if (this.userloginForm.valid) {
      this.isLoading = true;
      this.EgazeService.loginFun(userloginForm).subscribe(message => {
        //alert(message);
        this.isLoading = false;
        if (message === null) {
          this.invalidCredential = "Invalid Credentials";
          if (this.loginAttemptcount == 0 && this.userloginForm.value.username && this.userloginForm.value.userpwd) {
            this.attemptloginMessage = 'Your account has been locked, Please wait for some time..';
          }
          else if (this.userloginForm.value.username && this.userloginForm.value.userpwd) {
            this.loginAttemptcount = this.loginAttemptcount - 1;
            this.attemptloginMessage = 'Only ' + this.loginAttemptcount + ' Login Attempts Available, Please enter valid Username and Password.';
            if (this.loginAttemptcount == 0) {
              this.disabledField = true;
            }
          }
        }
        else {
          this.user = JSON.stringify(message);
          this.user1 = JSON.parse(this.user + "");

          if (this.user1.role === 'admin') {
            this.sessionstorageService.setUserDetails(this.user);
            window.location.href = AppConstants.AdminloginURL;
          } else if (this.user1.role === 'agent' && this.user1.status === 'P') {
            this.invalidCredential = "Your account is not approved.Please contact Admin."
          }
          else {

            this.sessionstorageService.setUserDetails(this.user);
            // this.EgazeService.getSigninOTP(this.user1.email, this.user1.mobile).subscribe(result => {
            //   this.forgotpwdmodal('signinotpmodal');
            //   this.updateOTP = result;
            //   this.timer(300);
            // }, error => {
            // });
            this.redirect();

          }

        }//end of else

      }, error => {
        this.isLoading = false;
        this.invalidCredential = 'Server error has occurred, Please try later.'


      });

    } else {
      this.submitted = true;


    }
  }
  /** forgot Modal code */
  forgotpwdmodal(id: string) {
    this.otphide = false;
    this.passwordAccess = false;
    this.useridForget = true;
    this.pwschanged = "";
    this.emailnotExists="";
    this.serverError="";
    this.userForgtForm.controls['emailidForget'].setValue("");
    this.otpForm1.controls['otp'].setValue("");
    this.errorValidation="";
    this.submitted2 = false;
    this.submitted1 = false;

    this.ModalPropertyService.open(id);
  }
  closeModal(id: string) {
    this.ModalPropertyService.close(id);
  }
  /** forgot Modal code close here*/

  showTextPwd(userloginForm) {
    if (userloginForm.value.userpwd) {
      this.showText = !this.showText;
      this.showIconEye = !this.showIconEye;
      this.hideIconEye = !this.hideIconEye;
    }
  }
  mouseoverpwd() {
    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;
  }
  showTextPwd1(newpwdForm) {
    if (newpwdForm.value.confirmnewpwd) {
      this.showText1 = !this.showText1;
      this.showIconEye1 = !this.showIconEye1;
      this.hideIconEye1 = !this.hideIconEye1;
    }
  }
  
  mouseoverpwd1() {
    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;
  }
  showTextPwd2(newpwdForm) {
    if (newpwdForm.value.newpwd) {
      this.showText2= !this.showText2;
      this.showIconEye2 = !this.showIconEye2;
      this.hideIconEye2 = !this.hideIconEye2;
    }
  }
  
  mouseoverpwd2() {
    this.showText2= false;
    this.showIconEye2 = false;
    this.hideIconEye2 = true;
  }
  m: any;
  s: any;
  timerd: any = "05:00";
  sub: any;
  timer(remaining) {
    var source = interval(1000);
    if (parseInt(remaining) > 0) {
      this.sub = source.subscribe(val => {

        if (parseInt(remaining) > 0) {
          this.m = Math.floor(remaining / 60);
          this.s = remaining % 60;

          this.m = this.m < 10 ? '0' + this.m : this.m;
          this.s = this.s < 10 ? '0' + this.s : this.s;

          this.timerd = this.m + ':' + this.s;
          remaining -= 1;
          this.timer1(remaining);
        } else {
          this.resend = true;
          this.sub.unsubscribe();
          return;
        }

      }, err => {
      }
      );
    } else {
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
  }


  m1: any;
  s1: any;
  timerd1: any = "05:00";
  sub1: any;
  resend1:any=false;
  timer11(remaining) {
    this.m1=0;
    this.s1=0;
    var source1 = interval(1000);
    if (parseInt(remaining) > 0) {
      
      this.sub1 = source1.subscribe(val => {

        if (parseInt(remaining) > 0) {
          this.m1 = Math.floor(remaining / 60);
          this.s1 = remaining % 60;

          this.m1 = this.m1 < 10 ? '0' + this.m1 : this.m1;
          this.s1 = this.s1 < 10 ? '0' + this.s1 : this.s1;

          this.timerd1 = this.m1 + ':' + this.s1;
          remaining -= 1;
          this.timer12(remaining);
        } else {
          this.resend1 = true;
          this.sub1.unsubscribe();
          return;
        }

      }, err => {
      }
      );
    } else {
      return;
    }
  }
  timer12(remaining) {
    this.m1= Math.floor(remaining / 60);
    this.s1 = remaining % 60;

    this.m1 = this.m1 < 10 ? '0' + this.m1 : this.m1;
    this.s1 = this.s1 < 10 ? '0' + this.s1 : this.s1;

    this.timerd1 = this.m1 + ':' + this.s1;
    remaining -= 1;
  }

  resendotp() {
    this.isLoading = true;
    this.EgazeService.getSigninOTP(this.user1.email, this.user1.mobile).subscribe(result => {
      this.isLoading = false;
      this.updateOTP = result;
      this.resend = false;
      this.timer(300);
    },
      error => {
        this.isLoading = false;
      });
  }
  emai:any;
  userIdforget(userId): void {
    this.submitted1 = true;
    this.emailnotExists = '';
    this.emai=userId.value.emailidForget;
    if (this.userForgtForm.valid) {
      this.isLoading = true;

      this.EgazeService.existingUserFun(userId.value.emailidForget).subscribe(result => {
        this.isLoading = false;
        if (result) {
          this.isLoading = true;

          this.EgazeService.forgotuserpwd(userId.value.emailidForget).subscribe(result => {
            this.isLoading = false;
            this.otphide = true;
            this.passwordAccess = false;
            this.useridForget = false;
            this.submitted1 = false;

            this.updateOTP = result;
            this.timer11(300);

          },
            error => {
              this.isLoading = false;
              this.serverError = 'Server error has occurred, Please try later.'
            });
        }
        else {
          this.isLoading = false;
          this.emailnotExists = 'Sorry, The registered email does not exists'
        }
      },
        error => {
          this.isLoading = false;
          this.serverError = 'Server error has occurred, Please try later.'
        }
      );
    }
  }

  OTPSave1() {
    this.submitted2 = !this.submitted2;
    
    if (parseInt(this.otpForm1.value.otp) === this.updateOTP) {
      //this.routerProperty.navigateByUrl('/success-register');
      this.otpForm1.value.otp = "";
      this.passwordAccess = true;
      this.otphide = false;
      this.errorMessage = '';

    }
    else if (this.otpForm1.value.otp) {
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
      this.isLoading = true;
      if (this.newpwdForm.value.newpwd === this.newpwdForm.value.confirmnewpwd) {

        this.EgazeService.pwdchange(this.newpwdForm.value, this.userForgtForm.value).subscribe(result => {
          this.isLoading = false;
          if (result) {
            this.pwschanged = "Successfully password has been changed. Please LOGIN with new password.";
            this.errorMessage = '';
          }
        },
          error => {
            this.isLoading = false;
            this.errorMessage = 'Server error has occurred. Please try later.'
          }
        );
      }
      else {
        this.isLoading = false;
        this.notmatchpwd = "New password and confirm password must be match"
      }
    }
  }
  resendotp1(){
    this.isLoading = true;
   
   // this.emai="madishetty.kishore@gmail.com";
          this.EgazeService.forgotuserpwd(this.emai).subscribe(result => {
            this.isLoading = false;
            this.updateOTP = result;
            this.resend1=false;
            this.timer11(300);
          },
            error => {
              this.isLoading = false;
              this.serverError = 'Server error has occurred, Please try later.'
            });
  }
}