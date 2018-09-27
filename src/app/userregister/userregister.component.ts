import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from '../messagemodalpopup/messagemodalpopup.component'
import { EgazeService } from '../services/egaze.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  modalService: any;
  viewRef: any;
  loading: string;
  existsUser: string;
  isLoading: boolean;
  termsCheckederrors:any='';
  constructor(private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService) {

    this.modalService = modalService;
    this.viewRef = viewRef;
  }
 isNumberKey(evt)
  {
     var charCode = (evt.which) ? evt.which : evt.keyCode
     if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

     return true;
  }

  ngOnInit() {
    var emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    
    this.registerForm = this.formBuilder.group({
      registerType:[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileNumber: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6),this.passwordConfirming]],
      termsChecked: [false, Validators.required]
    });
    this.registerForm.controls['registerType'].setValue("customer");
    this.registerForm.controls['termsChecked'].setValue("true");
 }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
 passwordConfirming(c: AbstractControl): any {
    if(!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd= c.parent.get('confirmPassword')

    if(!pwd || !cpwd) return ;
    if (pwd.value !== cpwd.value) {
        return { notSame: true };

}

 }
  onSubmit(formData) {
    debugger;
    this.submitted = true;
    //console.log(JSON.stringify(this.registerForm))
    // stop here if form is invalid
    if ( this.registerForm.invalid) {
      if(!formData.value.termsChecked)
      this.termsCheckederrors="Please accept terms and conditions";
      else
      this.termsCheckederrors="";
      return;
    }
    else {
      this.termsCheckederrors="";
      this.isLoading = true;
      this.EgazeService.existingUserFun(formData.value.email).subscribe(
        result => {
          if (result) {
            this.isLoading = false;
            this.existsUser = "This email address already exists.";
          }
          else {
            this.isLoading = false;
            sessionStorage.setItem("formData", JSON.stringify(formData.value));
            this.openNewDialog(formData);
          }
        }

      );





      //this.router.navigateByUrl('/userdashboard');
    }
  }

  openNewDialog(formData) {
    this.modalService.openDialog(this.viewRef, {
      title: 'Validate OTP(One Time Passcode)',
      childComponent: MessagemodalpopupComponent
    });
  }
}
