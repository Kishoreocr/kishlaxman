import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Userdata } from '../userdata';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from '../messagemodalpopup/messagemodalpopup.component';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { EgazeService } from '../services/egaze.service';

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
  invalidCredential:string;
  
  constructor(private fb: FormBuilder, router: Router, route: ActivatedRoute, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService:EgazeService ) {
    this.disabledField = false;
    this.routerProperty = router;
    this.modalService = modalService;
    this.viewRef  = viewRef;

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
    this.disabledField = false;
    this.userloginForm = this.fb.group({
      username: ['', Validators.required],
      userpwd: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userloginForm.controls; }
  
  saveUser(userloginForm) {
    this.submitted = true;
    this.EgazeService.loginFun(userloginForm).subscribe(message => { 


    if(null){
       this.invalidCredential = "Invalid Credential"
    }
    else{
      this.routerProperty.navigateByUrl('/package-choose');
      
      this.userloginForm.value.username = "";
      this.userloginForm.value.userpwd = "";
    }
     
    });

    if (this.userloginForm.value.username === 'demo@gmail.com' && this.userloginForm.value.userpwd === 'demo123') {
     
      this.routerProperty.navigateByUrl('/package-choose');
      
      this.userloginForm.value.username = "";
      this.userloginForm.value.userpwd = "";
    }
    else {
      if (this.loginAttemptcount == 0 && this.userloginForm.value.username && this.userloginForm.value.userpwd) {
        this.attemptloginMessage = 'Your account has been locked, Please wait for some time..';
        //alert("No Login Attempts Available , Please wait for some time..");
      }
      else if (this.userloginForm.value.username && this.userloginForm.value.userpwd) {
        this.loginAttemptcount = this.loginAttemptcount - 1;
        this.attemptloginMessage = 'Login Failed Now Only ' + this.loginAttemptcount + ' Login Attempts Available, Please enter valid Username and Password.';
        //alert("Login Failed Now Only "+this.loginAttemptcount+" Login Attempts Available");
        if (this.loginAttemptcount == 0) {
          this.disabledField = true;
        }
      }
    }
    return false;
    // else {
    //   this.routerProperty.navigateByUrl('/loginform');
    // }
    // if (this.userloginForm.dirty && this.userloginForm.valid) {
    //  // alert(`user Name: ${this.userloginForm.value.username} password: ${this.userloginForm.value.userpwd}`);
    // }
  }

  forgetPWD(event){
    event.preventDefault();
    this.openNewDialog();
  }
  openNewDialog() {
    this.modalService.openDialog(this.viewRef, {
      title: 'Forgot your Password?',
      childComponent: ForgetpasswordComponent
    });
  }

}