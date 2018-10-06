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

  constructor(private formBuilder: FormBuilder, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, ) {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    this.getsaveprofile();
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
  ngOnInit() {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    this.isEditDisabled = false;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
    this.updateuserProfilestatus = '';
    this.profilechndResultMsg = '';

    this.updateuserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
     // email: [null],
     // mobileNumber: [null],
      address1: [null],
      address2: [null],
      address3: [null],
      city: [null],
      state: [null],
      zipCode: [null, Validators.maxLength(6)],
      country: [null],
    });

    this.updateuserNewpwdForm = this.formBuilder.group({
      oldpwd: ['', [Validators.required, Validators.minLength(6)]],
      newpwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmpwd: ['', [Validators.required, Validators.minLength(6), this.passwordConfirming]],

    });

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