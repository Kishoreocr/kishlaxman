import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  submitted:boolean=false;
  contactusForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.contactusForm = this.fb.group({
      type:['',[ Validators.required]],
      description:['',[ Validators.required]],
      name:['',[ Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobile: ['',[ Validators.required,Validators.minLength(10),Validators.maxLength(10)]] //, Validators.minLength(6)
    });
    this.contactusForm.controls['type'].setValue("Issue");

  }
  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  get f() { return this.contactusForm.controls; }

  savedata(contactusform) {
    this.submitted = true;
    if (this.contactusForm.valid) {

    }else{
      this.submitted = true;
    }

}
}
