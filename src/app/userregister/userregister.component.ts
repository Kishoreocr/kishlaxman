import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from '../messagemodalpopup/messagemodalpopup.component'
import { EgazeService } from '../services/egaze.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
import { ModalPropertyService } from '../services/modal-property.service';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  submitted1 = false;
  modalService: any;
  viewRef: any;
  loading: string;
  existsUser: string;
  isLoading: boolean;
  termsCheckederrors: any = '';
  mobileNumbererror: boolean = false;
  country: any = "";
  countryCode: any = "";

  showText: boolean;
  showIconEye: boolean = false;
  hideIconEye: boolean = false;

  showText1: boolean;
  showIconEye1: boolean = false;
  hideIconEye1: boolean = false;

  isie: any = false;
  otpForm: FormGroup;
  otpValue: any;
  errorMessage: any;
  errorValidation: string;
  timerOn = true;
  resend:any=false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService, private ModalPropertyService: ModalPropertyService) {

    this.modalService = modalService;
    this.viewRef = viewRef;

    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;

    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;

  }
  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }

  isCharts(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8)
      return true;
    else {
      return false;
    }
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
    if (window.navigator.userAgent.indexOf("Chrome") === -1) {
      this.isie = true;
    } else {
      this.isie = false;
    }

    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.registerForm = this.formBuilder.group({
      registerType: [],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileNumber: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      password: ['', [Validators.required, Validators.minLength(4),this.pswdstrong]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), this.passwordConfirming,this.pswdstrong,]],
      termsChecked: [false, Validators.required],
      country: [null],
      countryCode: [null],
      type: [null]
    });

    this.registerForm.controls['registerType'].setValue("customer");
    this.registerForm.controls['termsChecked'].setValue("true");
    this.registerForm.controls['country'].setValue("India");
    this.registerForm.controls['countryCode'].setValue("in");
    this.route.queryParamMap.subscribe(params => {
      if (params.get('type') === 'free') {
        this.registerForm.controls['type'].setValue("Free");
      } else {
        this.registerForm.controls['type'].setValue("Normal");
      }
    });
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  //  firstname(){
  //    if(!this.registerForm.get('firstName').valid){
  //     this.registerForm.get('firstName').setValidators(Validators.required);
  //  }
  //  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get f1() { return this.otpForm.controls; }
  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword')

    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
      return { notSame: true };

    }

  }
  telInputObject(obj) {
    //console.log(obj);
    obj.intlTelInput('setCountry', 'in');
  }
  onCountryChange(obj) {
    //alert(JSON.stringify(obj))
    if (obj != null) {
      var name = obj.name;
      var v = name.split('(')
      this.registerForm.controls['country'].setValue(v[0]);
      this.registerForm.controls['countryCode'].setValue(obj.iso2);

    } else {
      this.registerForm.controls['country'].setValue("India");
      this.registerForm.controls['countryCode'].setValue("in");
    }

  }
  getNumber(obj) {
    this.registerForm.controls['mobileNumber'].setValue(obj);

  }
  hasError(obj) {
    this.mobileNumbererror = obj;
    //alert(this.mobileNumbererror)
  }
  onSubmit(formData) {
    debugger;
    //alert(this.registerForm.get('countryCode').value)
    this.submitted = true;
    //console.log(JSON.stringify(this.registerForm))
    // stop here if form is invalid

    if (this.registerForm.invalid) {
      return;
    } else if (!formData.value.termsChecked) {
      if (!formData.value.termsChecked)
        this.termsCheckederrors = "Please accept terms and conditions";
      else
        this.termsCheckederrors = "";
    }
    else {
      this.termsCheckederrors = "";
      this.isLoading = true;
      this.EgazeService.existingUserFun(formData.value.email).subscribe(
        result => {
          //alert(result)
          if (result) {
            this.isLoading = false;
            this.existsUser = "This email address already exists.";
          }
          else {
            this.isLoading = true;
            // sessionStorage.setItem("formData", JSON.stringify(this.registerForm.value));
            //alert("ee")
            //alert(formData.value.email+"=="+formData.value.mobileNumber)
            this.EgazeService.getOTP(formData.value.email, formData.value.mobileNumber).subscribe(otp => {
              this.isLoading = false;
              this.otpValue = otp;
              this.registerModal('registermodal');
              this.timer(300);
            });

            //this.openNewDialog(formData);
          }
        }

      );





      //this.router.navigateByUrl('/userdashboard');
    }
  }
  terms() {
    if (this.registerForm.get('termsChecked').value)
      this.termsCheckederrors = "Please accept terms and conditions";
    else
      this.termsCheckederrors = "";
  }

  // openNewDialog(formData) {
  //   this.modalService.openDialog(this.viewRef, {
  //     title: 'Validate OTP(One Time Passcode)',
  //     childComponent: MessagemodalpopupComponent
  //   });
  // }

  /** register modal code */
  registerModal(id: string) {
    this.ModalPropertyService.open(id);
  }
  closeModal(id: string) {
    this.ModalPropertyService.close(id);
  }
  /** register modal code close here*/


  showTextPwd(registerForm) {
    if (registerForm.value.password) {
      this.showText = !this.showText;
      this.showIconEye = !this.showIconEye;
      this.hideIconEye = !this.hideIconEye;
    }
  }

  showTextPwd1(registerForm) {
    if (registerForm.value.confirmPassword) {
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


  OTPSave() {
    this.submitted1 = true;
    this.isLoading = true;
    this.errorMessage='';
    if (parseInt(this.otpForm.value.otp) === parseInt(this.otpValue)) {
     // debugger;
      //this.otpForm.value.otp = "";
      this.EgazeService.registerFun(this.registerForm.value).subscribe(result => {
        this.isLoading = false;
        if (result) {
          // sessionStorage.removeItem("formData");
          // sessionStorage.setItem("regsuc","success");
          this.router.navigateByUrl('/loginform?data=success');

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
          this.EgazeService.getOTP(this.registerForm.value.email, this.registerForm.value.mobileNumber).subscribe(result => {
            this.isLoading = false;
            this.otpValue = result;
            this.resend=false;
            this.timer(300);
          },
            error => {
              this.isLoading = false;
             // this.serverError = 'Server error has occurred, Please try later.'
            });
  }
}
