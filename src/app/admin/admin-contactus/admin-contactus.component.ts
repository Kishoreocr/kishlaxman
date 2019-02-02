import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../../services/egaze.service';
import { ModalService } from '../../admin/service/modal.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-admin-contactus',
  templateUrl: './admin-contactus.component.html',
  styleUrls: ['./admin-contactus.component.css']
})
export class AdminContactusComponent implements OnInit {
  requests:any;
  isLoading=false;
  submitted=false;
  
  frequest:any;
  feedbackForm: FormGroup;
  constructor(private egazeService: EgazeService,private modalService: ModalService,private formBuilder:FormBuilder) {
    this.getAllContactUsRequests();
   }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      status: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(6)]]
    });
    

  }
  get c() {
    return this.feedbackForm.controls;
  }
  getAllContactUsRequests() {
    this.egazeService.getAllContactUsRequests().subscribe(result => {
      this.requests = result;
    }, error => {
    });
  }
  email:any;
  openModal(id: string, cust) {
    this.submitted=false;
    this.frequest=cust;
    this.feedbackForm.controls['status'].setValue(cust.status);
    this.feedbackForm.controls['description'].setValue(cust.shortDescription);
    this.modalService.open(id);
    this.email=cust.email;
    if(cust.status === 'P'){
      this.feedbackForm.controls['status'].setValue("Approved");
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  getType(event) {
    this.feedbackForm.value.status = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  feedbackFun(){
    this.submitted=true;
    if (this.feedbackForm.valid) {
      this.isLoading = true;
      //alert(JSON.stringify(this.feedbackForm))
      this.egazeService.updatecontactus(this.feedbackForm.value,this.frequest,this.email).subscribe(result => {
        //this.requests = result;
        this.isLoading = false;

        this.modalService.close('custom-modal-feedback');
        this.getAllContactUsRequests();
      }, error => {
      });
      
    }
  }
}
