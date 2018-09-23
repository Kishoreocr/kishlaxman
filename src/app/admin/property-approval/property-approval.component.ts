import { Component, OnInit, Input, ViewContainerRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../../services/egaze.service';

@Component({
  selector: 'app-property-approval',
  templateUrl: './property-approval.component.html',
  styleUrls: ['./property-approval.component.css']
})
export class PropertyApprovalComponent implements OnInit {
  propertyApproval:any=[];
  @Input() propertyData:any;
  constructor(private EgazeService: EgazeService) {
    this.getPropertyDetails();
   }

  ngOnInit() {
    this.getPropertyDetails();
  }
  getPropertyDetails() {
    this.EgazeService.getPropertyApi().subscribe(result => {
      debugger;
      this.propertyApproval = result;
    }, error => {

    });

  }
}
