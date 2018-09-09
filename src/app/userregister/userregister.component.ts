import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService) {

    this.modalService = modalService;
    this.viewRef = viewRef;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      registerType:[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm.controls['registerType'].setValue("customer");

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(formData) {
    debugger;
    this.submitted = true;
    //console.log(JSON.stringify(this.registerForm))
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
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
