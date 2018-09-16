import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { ModalDialogService, IModalDialogSettings } from 'ngx-modal-dialog';
import { ViewpropertyComponent } from '../viewproperty/viewproperty.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
import { AppConstants } from '../services/constants';
import { ModalPropertyService} from '../services/modal-property.service';
// import { ModalPropertyComponent} from '../modal-property/modal-property.component'

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
  user: any;
  acc: any;

  updateuserProfile: any;
  updateuserProfilestatus: any;
  isLoading: boolean;
  alerts: any = [];

  isLoaderdiv: boolean = false;
  errorMsg: string = '';
  transactions: any = [];
  user1: any;

  propertyStatus: string;
  userAllpropertis: any = [];
  resultMsg: string;
  profilechndResultMsg: string;
  propertyCount: any;
  property:any='';
  constructor(private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private elem: ElementRef,
    private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, private ModalPropertyService: ModalPropertyService) {
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    this.user1 = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    this.getTransactions();
    this.getPropertiesCount();
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
      subRegisterOffice: [''],
      extentofProperty: ['', Validators.required],
      boundaries: [''],
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
      middleName: [],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      address1: ['', Validators.required],
      address2: [],
      address3: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      country: ['', Validators.required],
    });

    this.updateuserNewpwdForm = this.formBuilder.group({
      oldpwd: ['', Validators.required],
      newpwd: ['', Validators.required],
      confirmpwd: ['', Validators.required],

    });
    this.propertiesShow();
  }
  ngAfterViewChecked() {
    // you'll get your through 'elements' below code

    let acc = this.elem.nativeElement.querySelectorAll('.alertDivstyles');
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
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

  getType(event) {
    this.propertyForm.value.typeofProperty = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }


  propertyFun() {
    if (this.propertyCount != null) {
      var data = JSON.stringify(this.propertyCount);
      // alert(data)
      if (parseInt(this.propertyCount.propertiesLimit) == parseInt(this.propertyCount.propertiesUSed)) {
        alert("Your can not add the properties.Your Property add Limit has completed")
      } else {
        this.addProperty = !this.addProperty;
        this.viewProperties = !this.viewProperties;
      }
    } else {
      this.addProperty = !this.addProperty;
      this.viewProperties = !this.viewProperties;
    }
  }
  propertyFunView() {
    this.addProperty = !this.addProperty;
    this.viewProperties = !this.viewProperties;
  }
  userdashTabs(activeTab) {
    this.updateuserProfilestatus = "";
    this.propertyStatus = "";
    this.profilechndResultMsg = "";
    this.resultMsg = '';
    //this.activeSelected = true;
    switch (activeTab) {
      case 'Properties':
        this.propertyTab = true;
        this.alertsTab = false;
        this.transactionsTab = false;
        this.profileTab = false;
        this.propertyStatus = "";
        this.propertiesShow();
        break;
      case 'Alerts':
        this.propertyTab = false;
        this.alertsTab = true;
        this.transactionsTab = false;
        this.profileTab = false;
        this.getAlerts();
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
        this.updateuserProfilestatus = "";
        this.getsaveprofile();
        this.isEditDisabled = false;
        // this.resultMsg = "";
        // this.profilechndResultMsg = "";
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

  addPropertyFun(objProperty) {
    debugger;
    this.submitted = true;
    if (this.propertyForm.valid) {
      this.isLoaderdiv = true;
      this.EgazeService.addProperty(objProperty.value, this.user.loginId,this.user.email).subscribe(
        result => {
          this.isLoaderdiv = false;
          console.log(result);
          if (typeof result === "object") {
            const element = document.querySelector("#propertyDestination")
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })

            this.propertyStatus = "Property added Successfully";
            this.propertyForm.reset();
            this.submitted = false;
            this.propertiesShow();
            this.getPropertiesCount();
            this.getTransactions();
          }

        },
        error => {
          console.log(error);
        }

      );



    }


  }

  ChangingValue() {

  }

  updateuserFun(updateuserobj) {
    this.submitted = true;
    this.errorMsg = '';

    if (this.updateuserForm.valid) {
      this.isLoading = true;

      this.EgazeService.updateprofile(updateuserobj.value, this.user.loginId).subscribe(result => {
        this.isLoading = false;
        if (typeof result === "object") {
          this.isLoaderdiv = false;
          // setTimeout(function () {
          //   window.location.reload(true);
          // }, 2000);
          const element = document.querySelector("#destination")
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })

          this.updateuserProfilestatus = "Profile updated Successfully";
          this.isEditDisabled = false;
        }
      }, error => {
        this.isLoaderdiv = false;
        this.errorMsg = 'Server error has occurred. Please try later.';
      });

    }


  }

  profileeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
    this.errorMsg = '';
  }

  profileChangepwdFun() {
    this.userchangepwdflag = false;
    this.userEditprofileFlag = true;
    this.errorMsg = '';
  }

  profileChangepwdSubmit(updateuserNewpwdForm) {
    this.submitted = true;
    this.errorMsg = '';

    //debugger;
    if (this.updateuserNewpwdForm.valid) {
      this.isLoaderdiv = true;
      this.EgazeService.profilechndpwd(updateuserNewpwdForm.value, this.user.email).subscribe(
        result => {
          this.isLoaderdiv = false;
          console.log(result);
          if (result === 'SUCCESS') {
            const element = document.querySelector("#profilechndpwd")
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            this.updateuserNewpwdForm.reset();
            this.submitted = false;

            this.profilechndResultMsg = "Congrats, Successfully changed your password";
            this.resultMsg = "";
          }
          if (result === 'Incorrect Old Password') {
            debugger;
            this.resultMsg = "Sorry you entered wrong old password";
            this.profilechndResultMsg = "";
          }
        },
        error => {
          alert(JSON.stringify(error));
          this.isLoaderdiv = false;
          this.resultMsg = "Sorry you entered wrong old password";
        }

      );



    }

  }

  getsaveprofile() {
    this.EgazeService.getprofile(this.user.loginId).subscribe(result => {
      this.updateuserProfile = result;

      if (result) {
        this.updateuserForm.setValue({
          firstName: this.updateuserProfile.firstName,
          middleName: this.updateuserProfile.middleName,
          lastName: this.updateuserProfile.lastName,
          email: this.updateuserProfile.email,
          mobileNumber: this.updateuserProfile.mobileNo,
          address1: this.updateuserProfile.address1,
          address2: this.updateuserProfile.address2,
          address3: this.updateuserProfile.address3,
          city: this.updateuserProfile.city,
          state: this.updateuserProfile.state,
          zipCode: this.updateuserProfile.zip,
          country: this.updateuserProfile.country,
        });
      }
      console.log('this.updateProfile', JSON.stringify(this.updateuserProfile));
    }, error => {

    });

  }

  getAlerts() {
    this.EgazeService.getAlerts(this.user.loginId).subscribe(result => {
      debugger;
      this.alerts = result;
    }, error => {

    });

  }
  getPropertiesCount() {
    this.EgazeService.getCustomerPackageLatestRecord(this.user.loginId).subscribe(result => {
      debugger;
      this.propertyCount = result;
    }, error => {

    });

  }
  getTransactions() {
    this.EgazeService.getCustomerPackages(this.user1.loginId).subscribe(
      result => {
        if (Object.keys(result).length === 0) {
          this.isLoading = false;
          window.location.href = AppConstants.packageURL;
        }
        this.transactions = result;
      }

    );
  }
  propertiesShow() {

    this.EgazeService.getAllproperties(this.user.loginId).subscribe(
      result => {
        debugger;
        this.userAllpropertis = result;
      },
      error => { }
    );

  }




  openModal(id: string,property) {
    debugger;
    this.property=property;
    this.ModalPropertyService.open(id);
  }

  closeModal(id: string) {
    this.ModalPropertyService.close(id);
  }




}
