import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent} from '../messagemodalpopup/messagemodalpopup.component'

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  modalService:any;
  viewRef:any;

  constructor(private formBuilder: FormBuilder, private router:Router, modalService: ModalDialogService, viewRef: ViewContainerRef) { 

    this.modalService = modalService;
    this.viewRef  = viewRef;
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobileNumber:[null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
          zipCode:['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else {
        this.openNewDialog();
        //this.router.navigateByUrl('/userdashboard');
      }
  }

  openNewDialog() {
    this.modalService.openDialog(this.viewRef, {
      title: 'Validate OTP(One Time Passcode)',
      childComponent: MessagemodalpopupComponent
    });
  }
}
