import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { ModalDialogService, IModalDialogSettings } from 'ngx-modal-dialog';
import { ViewpropertyComponent } from '../viewproperty/viewproperty.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  addProperty: boolean = true;
  viewProperties: boolean = false;
  activeSelected: boolean = false;
  propertyTab: boolean = false;
  alertsTab: boolean = false;
  transactionsTab: boolean = false;
  profileTab: boolean = false;
  modalService: any;
  viewRef: any;
  selectedviewfullDetails: any;
  propertyForm: FormGroup;
  submitted = false;
  isEditDisabled: boolean = false;
  userEditprofileFlag: boolean = false;

  updateuserForm: FormGroup;
  updateuserNewpwdForm: FormGroup;
  userchangepwdflag: boolean = false;
user:any;
acc:any;
  constructor(private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private elem: ElementRef) {
    this.modalService = modalService;
    this.viewRef = viewRef;
  }

  ngOnInit() {
    //this.propertyForm.controls['typeofProperty'] = 'Residential';
    this.propertyTab = true;
    this.isEditDisabled = false;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
    this.submitted = false;

    this.propertyForm = this.formBuilder.group({
      typeofProperty: ['', Validators.required],
      titleHolder: ['', Validators.required],
      relationshipTocustomer: ['', Validators.required],
      surveyNoDrNo: ['', Validators.required],
      subRegisterOffice: ['', Validators.required],
      extentofProperty: ['', Validators.required],
      boundaries: ['', Validators.required],
      documentNo: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      villageCity: ['', Validators.required],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.updateuserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      zipCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],

    });

    this.updateuserNewpwdForm = this.formBuilder.group({
      oldpwd: ['', Validators.required],
      newpwd: ['', Validators.required],
      confirmpwd: ['', Validators.required],

    });

  }
  ngAfterViewChecked(){
    // you'll get your through 'elements' below code
    debugger;
    let acc = this.elem.nativeElement.querySelectorAll('.alertDivstyles');
    let i;
   for (i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", function() {
           /* Toggle between adding and removing the "active" class,
           to highlight the button that controls the panel */
           this.classList.toggle("active");
           /* Toggle between hiding and showing the active panel */
           var panel = this.nextElementSibling;
           if (panel.style.display === "block") {
               panel.style.display = "none";
           } else {
               panel.style.display = "block";
           }
       });
   }
}
  // convenience getter for easy access to form fields
  get f() { return this.propertyForm.controls; }

  get feditP() { return this.updateuserForm.controls }

  get fpwdP() { return this.updateuserNewpwdForm.controls }



  propertyFun() {
    this.addProperty = !this.addProperty;
    this.viewProperties = !this.viewProperties;
  }
  userdashTabs(activeTab) {
    //this.activeSelected = true;
    switch (activeTab) {
      case 'Properties':
        this.propertyTab = true;
        this.alertsTab = false;
        this.transactionsTab = false;
        this.profileTab = false;
        break;
      case 'Alerts':
        this.propertyTab = false;
        this.alertsTab = true;
        this.transactionsTab = false;
        this.profileTab = false;
        break;
      case 'Transactions':
        this.propertyTab = false;
        this.alertsTab = false;
        this.transactionsTab = true;
        this.profileTab = false;
        break;
      case 'Profile':
        this.propertyTab = false;
        this.alertsTab = false;
        this.transactionsTab = false;
        this.profileTab = true;
        break;

      default:
        this.propertyTab = true;
    }

  }


  viewPropertyFun() {
    //this.selectedviewfullDetails;
    this.openNewDialog();
  }
  openNewDialog() {
    this.modalService.openDialog(this.viewRef, {
      title: 'View Property',
      childComponent: ViewpropertyComponent,
      settings: 'modal-lg',
    }, { settings: { modalClass: 'modal-lg' } });

  }

  addPropertyFun() {
    this.submitted = true;

  }

  ChangingValue() {

  }

  updateuserFun() {
    this.submitted = true;
  }

  profileeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
  }

  profileChangepwdFun() {
    this.userchangepwdflag = false;
    this.userEditprofileFlag = true;
  }

  profileChangepwdSubmit() {
    this.submitted = true;
  }


  






}
