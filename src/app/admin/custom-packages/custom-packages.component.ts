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
  constructor(private fb: FormBuilder, private EgazeService: EgazeService) {



  }

  ngOnInit() {

    var RegExpNumber = /^-?[0-9]+(\.[0-9]*){0,1}$/g;

    this.customPackagesForm = this.fb.group({
      descriptionCustom: ['', [Validators.required]],
      packageLimit: ['', [Validators.required, Validators.pattern(RegExpNumber)]],
      packagePeriod: ['', [Validators.required]],
      customerCustom: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.customPackagesForm.controls; }



  saveCustomPackage(customPackageForm) {
    if (this.customPackagesForm.valid) {
      this.isLoading = true;
      this.EgazeService.loginFun(customPackageForm).subscribe(message => {
        this.isLoading = false;
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
}
