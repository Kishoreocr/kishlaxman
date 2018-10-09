import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EgazeService } from '../../services/egaze.service';
@Component({
  selector: 'app-custom-packages',
  templateUrl: './custom-packages.component.html',
  styleUrls: ['./custom-packages.component.css']
})


export class CustomPackagesComponent implements OnInit {
  customPackagesForm: FormGroup;
  submitted = false;
  isLoading = false;
  customPlanUsers:any;
  status=false;
  customPlanUserRecords:any;
  constructor(private fb: FormBuilder, private EgazeService: EgazeService) {

    this.getCustomPlanUsers();

    this.getCustomPlanUserRecords();

  }

  ngOnInit() {

    var RegExpNumber = /^-?[0-9]+(\.[0-9]*){0,1}$/g;

    this.customPackagesForm = this.fb.group({
      descriptionCustom: ['', [Validators.required]],
      packageLimit: ['', [Validators.required]],
      packagePeriod: ['', [Validators.required]],
      customerCustom: ['', [Validators.required]],
      price:['', [Validators.required]]
    });
    this.customPackagesForm.controls['customerCustom'].setValue("");

  }
  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  // convenience getter for easy access to form fields
  get f() { return this.customPackagesForm.controls; }

  type(event){
    this.customPackagesForm.value.customerCustom = "" + event;
    //alert(event+"")

  }

  saveCustomPackage(customPackageForm) {
    this.status=false;
    if (this.customPackagesForm.valid) {
      this.isLoading = true;
      this.EgazeService.createCustomPackage(this.customPackagesForm.value).subscribe(message => {
        this.isLoading = false;
        this.status=true;
        this.customPackagesForm.controls['customerCustom'].setValue("");
        this.customPackagesForm.controls['price'].setValue("");
        this.customPackagesForm.controls['packageLimit'].setValue("");
        this.customPackagesForm.controls['packagePeriod'].setValue("");
        this.customPackagesForm.controls['descriptionCustom'].setValue("");

      });
    }
    else {
      this.submitted = true;

    }
  }

  isNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getCustomPlanUsers() {
    this.EgazeService.getCustomPlanUsers().subscribe(result => {
     // debugger;
      this.customPlanUsers = result;
    }, error => {

    });

  }
  getCustomPlanUserRecords(){
    this.EgazeService.getCustomPlanUserRecords().subscribe(result => {
      // debugger;
       this.customPlanUserRecords = result;
     }, error => {
 
     });
  }
}
