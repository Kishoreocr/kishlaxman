import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Userdata } from '../userdata';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  resend:any=false;

  constructor(private fb: FormBuilder, router: Router, private route: ActivatedRoute, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, private http: HttpClient, private ModalPropertyService: ModalPropertyService) {
    this.disabledField = false;
    this.routerProperty = router;
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.sessionstorageService.removeUserDetails("user");

    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;

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


  }
  // convenience getter for easy access to form fields
  get f() { return this.userloginForm.controls; }
  get f1() { return this.otpForm.controls; }
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

  redirect(){
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
          } else if(this.user1.role === 'agent' && this.user1.status === 'P'){
            this.invalidCredential = "Your account is not approved.Please contact Admin."
          }
          else {

             this.sessionstorageService.setUserDetails(this.user);
            this.EgazeService.getSigninOTP(this.user1.email, this.user1.mobile).subscribe(result => {
              this.forgotpwdmodal('signinotpmodal');
              this.updateOTP = result;
              this.timer(300);
            }, error => {
            });
            //this.redirect();

          }
      
        }//end of else

      }, error => {
        this.isLoading = false;
        this.invalidCredential = 'Server error has occurred, Please try later.'


      });

      // if (this.userloginForm.value.username === 'demo@gmail.com' && this.userloginForm.value.userpwd === 'demo123') {

      //   this.routerProperty.navigateByUrl('/package-choose');

      //   this.userloginForm.value.username = "";
      //   this.userloginForm.value.userpwd = "";
      // }

      // return false;
    } else {
      this.submitted = true;


    }
  }

  // forgetPWD(event) {
  //   event.preventDefault();
  //   this.openNewDialog();
  // }
  // openNewDialog() {
  //   this.modalService.openDialog(this.viewRef, {
  //     title: 'Forgot your Password?',
  //     childComponent: ForgetpasswordComponent
  //   });
  // }

  /** forgot Modal code */
  forgotpwdmodal(id: string) {
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
    this.isLoading = true;
          this.EgazeService.getSigninOTP(this.user1.email, this.user1.mobile).subscribe(result => {
            this.isLoading = false;
            this.updateOTP = result;
            this.resend=false;
            this.timer(300);
          },
            error => {
              this.isLoading = false;
             // this.serverError = 'Server error has occurred, Please try later.'
            });
  }
}