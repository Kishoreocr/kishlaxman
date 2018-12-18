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
  status:any='';
  properties: any;
  assignedproperties: any = [];
  constructor(private fb: FormBuilder, private EgazeService: EgazeService) {

    this.getAgents();
    this.getAssignableProperties();
    this.getAssignedProperties();
  }

  ngOnInit() {


    this.propertyAssignmentForm = this.fb.group({

      agent: ['', [Validators.required]],
      property: ['', [Validators.required]]
    });
    this.propertyAssignmentForm.controls['agent'].setValue("");

  }
  // convenience getter for easy access to form fields
  get f() { return this.propertyAssignmentForm.controls; }

  agenttype(event) {
    this.propertyAssignmentForm.value.agnet = "" + event;
  }
  propertytype(event) {
    this.propertyAssignmentForm.value.property = "" + event;
  }

  propertyAssignment(propertyAssignmentForm) {
    this.status = false;
    if (this.propertyAssignmentForm.valid) {
      this.isLoading = true;
      this.EgazeService.assignProperty(this.propertyAssignmentForm.value).subscribe(message => {
        this.isLoading = false;
        this.status = "Successfully assigned the property to Agent.";
        this.propertyAssignmentForm.controls['agent'].setValue("");
        this.propertyAssignmentForm.controls['property'].setValue("");
        this.submitted = false;
        this.getAssignedProperties();
      });
    }
    else {
      this.submitted = true;

    }
  }


  getAgents() {
    this.EgazeService.getAgentDetails().subscribe(result => {
      this.agents = result;
    }, error => {

    });

  }
  getAssignableProperties() {
    this.EgazeService.getAssignableProperties().subscribe(result => {
      this.properties = result;
    }, error => {

    });
  }
  getAssignedProperties() {
    this.EgazeService.getAssignedProperties().subscribe(result => {
      this.assignedproperties = result;
    }, error => {

    });
  }
  remove(status, id) {
    this.EgazeService.removeAssignedProperty(status, id).subscribe(result => {
      this.status = "Successfully removed the property from Agent.";
      this.getAssignedProperties();
    }, error => {

    });
  }

}
