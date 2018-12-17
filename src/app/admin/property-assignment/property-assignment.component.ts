import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EgazeService } from '../../services/egaze.service';

@Component({
  selector: 'app-property-assignment',
  templateUrl: './property-assignment.component.html',
  styleUrls: ['./property-assignment.component.css']
})
export class PropertyAssignmentComponent implements OnInit {
  propertyAssignmentForm: FormGroup;
  submitted = false;
  isLoading = false;
  agents: any;
  status = false;
  constructor(private fb: FormBuilder, private EgazeService: EgazeService) {

    this.getAgents();

   
  }

  ngOnInit() {


    this.propertyAssignmentForm = this.fb.group({

      agent: ['', [Validators.required]]
    });
    this.propertyAssignmentForm.controls['agent'].setValue("");

  }
  // convenience getter for easy access to form fields
  get f() { return this.propertyAssignmentForm.controls; }

  agenttype(event) {
    this.propertyAssignmentForm.value.customerCustom = "" + event;
    //alert(event+"")

  }

  // saveCustomPackage(customPackageForm) {
  //   this.status = false;
  //   if (this.customPackagesForm.valid) {
  //     this.isLoading = true;
  //     this.EgazeService.createCustomPackage(this.customPackagesForm.value).subscribe(message => {
  //       this.isLoading = false;
  //       this.status = true;
  //       this.customPackagesForm.controls['customerCustom'].setValue("");
  //       this.customPackagesForm.controls['price'].setValue("");
  //       this.customPackagesForm.controls['packageLimit'].setValue("");
  //       this.customPackagesForm.controls['packagePeriod'].setValue("");
  //       this.customPackagesForm.controls['descriptionCustom'].setValue("");
  //       this.getCustomPlanUserRecords();
  //     });
  //   }
  //   else {
  //     this.submitted = true;

  //   }
  // }


  getAgents() {
    this.EgazeService.getAgentDetails().subscribe(result => {
      this.agents = result;
    }, error => {

    });

  }


}
