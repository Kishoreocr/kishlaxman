import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  submitted:boolean=false;
  contactusForm: FormGroup;
  isLoading: boolean = false;
  user: any;
  status:boolean=false;
  mobile:any;

  constructor(private fb: FormBuilder,private sessionstorageService: SessionstorageService,private EgazeService: EgazeService) { 
    

  }

  ngOnInit() {
    this.mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  

    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.contactusForm = this.fb.group({
      type:['',[ Validators.required]],
      description:['',[ Validators.required, Validators.minLength(5)]],
      name:['',[ Validators.required, Validators.minLength(4)]],
      email: ['', [ Validators.required, Validators.pattern(emailPattern)]],
      mobile: ['',[ Validators.required, Validators.minLength(10), Validators.maxLength(10)]] //, Validators.minLength(6)
    });
    this.contactusForm.controls['type'].setValue("Feedback");
    if(this.sessionstorageService.getUserDetails()!=null){
      this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
      this.contactusForm.controls['email'].setValue(this.user.email);
       //     this.contactusForm.controls['mobile'].setValue(this.user.mobile);
         //   this.contactusForm.controls['mobile'].setValue("");
      }
  }
  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.charCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  getType(event){
    
  }
  

  get f() { return this.contactusForm.controls; }

  savedata(contactusform) {
    this.submitted = true;
    this.contactusForm.controls['name'].setValue(this.contactusForm.value.name.trim());
    if (this.contactusForm.valid) {
      this.isLoading = true;
      this.EgazeService.savecontactus(contactusform.value).subscribe(result => {
        //this.isLoading = false;
        //if (result) {
          this.isLoading = false;
          this.contactusForm.controls['description'].setValue("");
          this.contactusForm.controls['email'].setValue("");
          this.contactusForm.controls['name'].setValue("");
          this.contactusForm.controls['mobile'].setValue("");
          this.status = true;
          this.submitted=false;
          const element = document.querySelector("#destination")
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.scroll(0, 0);
          //this.isEditDisabled = false;
       // }
      }, error => {
        this.isLoading = false;
      //  this.errorMsg = 'Server error has occurred. Please try later.';
      });

    }else{
      this.submitted = true;
    }

}
isCharts(event) {
  if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32)
    return true;
  else {
    return false;
  }
}
}
