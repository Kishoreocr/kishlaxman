import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import{ AppConstants} from '../services/constants'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditDisabled: boolean = false;
  userchangepwdflag: boolean = false;
  userEditprofileFlag: boolean = false;
  errorMsg: any;
  updateuserForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  isLoaderdiv: boolean = false;
  updateuserProfilestatus: any;
  updateuserProfile: any;
  user: any;
  updateuserNewpwdForm: FormGroup;
  profilechndResultMsg: any;
  resultMsg: any;
  email: any;
  mobileNo: any;

  showText: boolean;
  showIconEye: boolean = false;
  hideIconEye: boolean = false;

  showText1: boolean;
  showIconEye1: boolean = false;
  hideIconEye1: boolean = false;

  showText2: boolean;
  showIconEye2: boolean = false;
  hideIconEye2: boolean = false;


  constructor(private formBuilder: FormBuilder, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, ) {
    // this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    debugger;
    // this.getsaveprofile();
    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;

    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;

    this.showText2 = false;
    this.showIconEye2 = false;
    this.hideIconEye2 = true;
  }


  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get('newpwd');
    const cpwd = c.parent.get('confirmpwd')

    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
      return { notSame: true };

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
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    this.isEditDisabled = false;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
    this.updateuserProfilestatus = '';
    this.profilechndResultMsg = '';

    this.updateuserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
     // email: [null],
     // mobileNumber: [null],
      address1: ['', Validators.minLength(6)],
      address2: ['', Validators.minLength(6)],
      address3: [''],
      city: [''],
      state: [''],
      zipCode: ['', Validators.minLength(4)],
      country: [''],
    });

    this.updateuserNewpwdForm = this.formBuilder.group({
      //,this.pswdstrong
      oldpwd: ['', [Validators.required, Validators.minLength(4),this.pswdstrong]],
      newpwd: ['', [Validators.required, Validators.minLength(4),this.pswdstrong]],
      confirmpwd: ['', [Validators.required, Validators.minLength(4), this.passwordConfirming,this.pswdstrong]],

    });
    debugger;
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    this.getsaveprofile();
  }

  get feditP() { return this.updateuserForm.controls }

  get fpwdP() { return this.updateuserNewpwdForm.controls }


  profileeditFun() {
    if(!this.isEditDisabled)
    this.isEditDisabled = true;
    else
    this.isEditDisabled = false;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
    this.errorMsg = '';
  }

  profileChangepwdFun() {
    if(this.isEditDisabled)
    this.isEditDisabled = false;
    else
    this.isEditDisabled = true;
    this.isEditDisabled = !this.isEditDisabled;

    this.submitted = false;
this.updateuserProfilestatus="";
    this.userchangepwdflag = false;
    this.userEditprofileFlag = true;
    this.errorMsg = '';
  }

  updateuserFun(updateuserobj) {
    this.submitted = true;
    this.errorMsg = '';
    
    if (this.updateuserForm.valid) {
      this.isLoading = true;
      this.EgazeService.updateprofile(updateuserobj.value, this.user.loginId,this.email,this.mobileNo).subscribe(result => {
        this.isLoading = false;
        if (typeof result === "object") {
          this.isLoading = false;
          // setTimeout(function () {
          //   window.location.reload(true);
          // }, 2000);
          const element = document.querySelector("#destination")
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.scroll(0, 0);

          this.updateuserProfilestatus = "Profile updated Successfully";
          this.isEditDisabled = false;
        }
      }, error => {
        this.isLoading = false;
        this.errorMsg = 'Server error has occurred. Please try later.';
      });

    }
  }


  getsaveprofile() {
    this.isLoading=true;
    this.EgazeService.getprofile(this.user.loginId).subscribe(result => {
      this.updateuserProfile = result;

      if (result) {
        this.isLoading=false;
        this.email=this.updateuserProfile.email;
        this.mobileNo=this.updateuserProfile.mobileNo;
        this.updateuserForm.setValue({
          firstName: this.updateuserProfile.firstName,
          middleName: this.updateuserProfile.middleName,
          lastName: this.updateuserProfile.lastName,
          //email: this.updateuserProfile.email,
          //mobileNumber: this.updateuserProfile.mobileNo,
          address1: this.updateuserProfile.address1,
          address2: this.updateuserProfile.address2,
          address3: this.updateuserProfile.address3,
          city: this.updateuserProfile.city,
          state: this.updateuserProfile.state,
          zipCode: this.updateuserProfile.zip,
          country: this.updateuserProfile.country
        });

      }
      console.log('this.updateProfile', JSON.stringify(this.updateuserProfile));
    }, error => {

    });

  }

  profileChangepwdSubmit(updateuserNewpwdForm) {
    this.submitted = true;
    this.errorMsg = '';

    //debugger;
    if (this.updateuserNewpwdForm.valid) {
      if(this.updateuserNewpwdForm.value.oldpwd === this.updateuserNewpwdForm.value.newpwd){
        this.resultMsg = "Old password and new password can not be same";
      }else{
        this.isLoading = true;

      this.EgazeService.profilechndpwd(updateuserNewpwdForm.value, this.user.email).subscribe(
        result => {
          this.isLoading = false;
          console.log(result);
          if (result === 'SUCCESS') {
            const element = document.querySelector("#profilechndpwd")
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            this.updateuserNewpwdForm.reset();
            this.submitted = false;

            this.profilechndResultMsg = "Password changed Successfully .Redirecting to login... !";
            setTimeout(() => {
              this.sessionstorageService.removeUserDetails("user");
            window.location.href=AppConstants.loginURL;
          }, 3000);
        
            
            this.resultMsg = "";
          }
          if (result === 'Incorrect Old Password') {
            debugger;
            this.resultMsg = "Sorry you entered wrong old password";
            this.profilechndResultMsg = "";
          }
        },
        error => {
          // alert(JSON.stringify(error));
          this.isLoading = false;
          this.resultMsg = "Sorry you entered wrong old password";
        }

      );

      }

    }

  }


  showTextPwd(updateuserNewpwdForm) {
    if (updateuserNewpwdForm.value.oldpwd) {
      this.showText = !this.showText;
      this.showIconEye = !this.showIconEye;
      this.hideIconEye = !this.hideIconEye;
    }
  }

  showTextPwd1(updateuserNewpwdForm) {
    if (updateuserNewpwdForm.value.newpwd) {
      this.showText1 = !this.showText1;
      this.showIconEye1 = !this.showIconEye1;
      this.hideIconEye1 = !this.hideIconEye1;
    }
  }

  showTextPwd2(updateuserNewpwdForm) {
    if (updateuserNewpwdForm.value.confirmpwd) {
      this.showText2 = !this.showText2;
      this.showIconEye2 = !this.showIconEye2;
      this.hideIconEye2 = !this.hideIconEye2;
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
  mouseoverpwd2() {
    this.showText2 = false;
    this.showIconEye2 = false;
    this.hideIconEye2 = true;
  }
 
  isCharts(event) {
    if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8)
      return true;
    else {
      return false;
    }
  }

}
