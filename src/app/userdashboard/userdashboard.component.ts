import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { ModalDialogService, IModalDialogSettings } from 'ngx-modal-dialog';
import { ViewpropertyComponent } from '../viewproperty/viewproperty.component';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
import { AppConstants } from '../services/constants';
import { ModalPropertyService } from '../services/modal-property.service';
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
  documentGrp: FormGroup;
  userchangepwdflag: boolean = false;
  user: any;
  acc: any;

  updateuserProfile: any;
  updateuserProfilestatus: any;
  isLoading: boolean = false;
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
  property: any = '';

  propertytabModal: boolean = true;
  documentstabModal: boolean = false;
  commentstabModal: boolean = false;

  propertyDetails: boolean = false;
  propertyDocuments: boolean = false;
  propertyId: any;
  commentForm: FormGroup;
  propertyStatusCode: any;
  propertydocs: any = [];

  upgradePlanForm: FormGroup;
  upgradePlanprocess: boolean = false;
  upgradePlanmessage: boolean = false;
  customdiv: boolean = false;

  documentId: any;

  firstFormStep: boolean = false;
  secondFormStep: boolean = false;
  thirdFormStep: boolean = false;



  constructor(private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private elem: ElementRef,
    private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, private ModalPropertyService: ModalPropertyService) {
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    this.user1 = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    this.getTransactions();
    this.getPropertiesCount();

    this.firstFormStep = true;
    this.secondFormStep = false;
    this.thirdFormStep = false;
  }

  ngOnInit() {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //this.propertyForm.controls['typeofProperty'] = 'Residential';
    this.propertyTab = true;
    this.isEditDisabled = false;
    this.userchangepwdflag = true;
    this.userEditprofileFlag = false;
    this.submitted = false;

    this.propertytabModal = true;
    this.propertyDetails = true;
    this.upgradePlanmessage = true;

    this.propertyForm = this.formBuilder.group({
      typeofProperty: ['', Validators.required],
      titleHolder: ['', Validators.required],
      relationshipTocustomer: ['', Validators.required],
      surveyNoDrNo: ['', Validators.required],
      subRegisterOffice: [''],
      extentofProperty: ['', Validators.required],
      boundaries: [''],
      boundariesNorth: [''],
      boundariesSouth: [''],
      boundariesEast: [''],
      boundariesWest: [''],
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
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileNumber: [],
      address1: [],
      address2: [],
      address3: [],
      city: [],
      state: [],
      zipCode: ['', Validators.maxLength(6)],
      country: [],
    });

    this.updateuserNewpwdForm = this.formBuilder.group({
      oldpwd: ['', [Validators.required, Validators.minLength(6)]],
      newpwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmpwd: ['', [Validators.required, Validators.minLength(6), this.passwordConfirming]],

    });
    this.documentGrp = this.formBuilder.group({
      file: [null, Validators.required]

    });
    this.items.push({ "pdoc": "" + this.lengthCheckToaddMore, "downoladUrl": "" });

    this.propertiesShow();
    this.commentForm = this.formBuilder.group({
      commentfield: ['', Validators.required],
      typeofProperty: ['', Validators.required],
      commentfile: [null]
    });

    this.commentForm.controls['typeofProperty'].setValue("nochanges");
    this.upgradePlanForm = this.formBuilder.group({
      plandetailsField: ['', Validators.required]
    });
  }

  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get('newpwd');
    const cpwd = c.parent.get('confirmpwd')

    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
      return { notSame: true };

    }

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
  get c() { return this.commentForm.controls; }

  get feditP() { return this.updateuserForm.controls }

  get fpwdP() { return this.updateuserNewpwdForm.controls }

  get ugplan() {return this.upgradePlanForm.controls }
  getType(event) {
    this.propertyForm.value.typeofProperty = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  getreltionType(event) {
    this.propertyForm.value.relationshipTocustomer = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  getstate(event) {
    this.propertyForm.value.state = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }

  propertyFun() {
    this.upgraderequestsucc='';
    if (this.propertyCount != null) {
      var data = JSON.stringify(this.propertyCount);
      // alert(data)
      if (parseInt(this.propertyCount.propertiesLimit) == parseInt(this.propertyCount.propertiesUSed)) {

        // this.addProperty = !this.addProperty;
        // this.viewProperties = !this.viewProperties;
        this.openpropertylimitModal('custom-modal-property-limit');
        //alert("Your can not add the properties. Your Property add Limit has completed")
      } else {
        this.addProperty = !this.addProperty;
        this.viewProperties = !this.viewProperties;
      }
    } else {
      this.addProperty = !this.addProperty;
      this.viewProperties = !this.viewProperties;
    }
  }
  selected=true;
  propertyFunView() {
      this.updateuserProfilestatus = "";
    this.propertyStatus = "";
    this.profilechndResultMsg = "";
    this.resultMsg = '';
    this.propertyDetails=true;
    this.addProperty = !this.addProperty;
    this.viewProperties = !this.viewProperties;
    this.firstFormStep=true;
    this.thirdFormStep=false;
    this.secondFormStep=false;
    this.selected=true;

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
      case 'PropertyDetailsTab':
        this.propertytabModal = true;
        this.documentstabModal = false;
        this.commentstabModal = false;

        break;
      case 'DocumentsTab':
        this.isLoaderdiv = true;
        this.EgazeService.getPrpopertyDocs(this.propertyId).subscribe(result => {
          this.propertydocs = result;
          //alert(this.propertydocs)
          this.isLoaderdiv = false;
          //this.sfile = null;
        }, error => {
          alert(JSON.stringify(error));
        });
        this.propertytabModal = false;
        this.documentstabModal = true;
        this.commentstabModal = false;
        break;
      case 'CommentsTab':
        this.propertytabModal = false;
        this.documentstabModal = false;
        this.commentstabModal = true;
        this.getPrpopertyComments(this.propertyId);

        break;

      // case 'propertyDetailsTab':

      //   this.propertyDetails = true;
      //   this.propertyDocuments = false;
      //   break;
      // case 'propertyDocumentsTab':
      //   this.propertyDetails = false;
      //   if (this.propertyStatus != '') {
      //     this.propertyDocuments = true;
      //   }


      default:
        this.propertyTab = true;
        this.propertytabModal = true;
        this.propertyDetails = true;
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
    event.stopPropagation();
    if (this.propertyForm.controls.typeofProperty.valid
      && this.propertyForm.controls.titleHolder.valid
      && this.propertyForm.controls.relationshipTocustomer.valid
      && this.propertyForm.controls.surveyNoDrNo.valid
      && this.propertyForm.controls.documentNo.valid 
      && this.propertyForm.controls.extentofProperty.valid && this.firstFormStep) {

      this.submitted = false;

      this.firstFormStep = false;
      this.secondFormStep = true;
      this.thirdFormStep = false;
    }
    // else {
    //   this.submitted = true;
    // }

    else if (this.propertyForm.controls.documentNo.valid && this.secondFormStep) {
     debugger;
      this.submitted = false;

      this.firstFormStep = false;
      this.secondFormStep = false;
      this.thirdFormStep = true;
    }
   

    else if (this.propertyForm.controls.address1.valid
      && this.propertyForm.controls.address2.valid
      && this.propertyForm.controls.villageCity.valid
      && this.propertyForm.controls.mandal.valid
      && this.propertyForm.controls.district.valid
      && this.propertyForm.controls.zip.valid
      && this.propertyForm.controls.state.valid) {

      this.submitted = false;

      this.firstFormStep = false;
      this.secondFormStep = false;
      this.thirdFormStep = true;

      this.isLoaderdiv = true;
      this.EgazeService.addProperty(objProperty.value, this.user.loginId, this.user.email).subscribe(
        result => {
          this.isLoaderdiv = false;
          console.log(result);
          if (typeof result === "object") {
            const element = document.querySelector("#propertyDestination")
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            this.propertyId = JSON.stringify(result['id']);
            //alert(this.propertyId)
            this.propertyStatus = "Property added Successfully.Please click on 'View Properties' button to view your propery.";
            this.propertyForm.reset();
            this.submitted = false;
            this.propertiesShow();
            this.getPropertiesCount();
            this.getTransactions();

           // this.propertyDocuments = true;
            this.propertyDetails = false;

          }
        },
        error => {
          console.log(error);
          this.isLoaderdiv = false;
        }

      );

    }
    else {
      this.submitted = true;
    }

  }

  PreviousForm(PreviousForm) {
    if (PreviousForm === 'FirstForm') {
      this.firstFormStep = true;
      this.secondFormStep = false;
      this.thirdFormStep = false;
    }
    if (PreviousForm === 'SecondForm') {
      this.firstFormStep = false;
      this.secondFormStep = true;
      this.thirdFormStep = false;
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

            this.profilechndResultMsg = "Successfully password changedd";
            this.resultMsg = "";
          }
          if (result === 'Incorrect Old Password') {
            debugger;
            this.resultMsg = "Sorry you entered wrong old password";
            this.profilechndResultMsg = "";
          }
        },
        error => {
          // alert(JSON.stringify(error));
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
      if (this.propertyCount != null) {
        var data = JSON.stringify(this.propertyCount);
        if (this.propertyCount.packageName === 'CUSTOM PLAN' && this.propertyCount.purchaseDate === this.propertyCount.expiryDate) {
          this.customdiv = true;
        }
      }
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


  openpropertylimitModal(id: string) {
    this.ModalPropertyService.open(id);
  }

  openModal(id: string, property) {
    this.property = property;
    this.propertytabModal = true;
    this.documentstabModal = false;
    this.commentstabModal = false;
    this.ModalPropertyService.open(id);
    //alert(this.property.id)
    this.propertyId = this.property.id;
    this.propertyStatusCode = this.property.status;
    this.getPrpopertyDocs(this.property.id)
  }

  closeModal(id: string) {
    this.ModalPropertyService.close(id);
    this.upgraderequestsucc='';
  }

  public totalfiles: Array<File> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 1;
  items: any = [];

  sfile: File;
  importfile(event: any) {
    const [file] = event.target.files;
    if (event.target.files && event.target.files.length) {
      this.sfile = file;
    }
  }
  fileSelectionEventcomments(event: any) {
    const reader = new FileReader();
    const [file] = event.target.files;
    if (event.target.files && event.target.files.length) {
      this.sfile = file;
    }
    // console.log(this.sfile)
    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        if (file.size <= 4194304) {
          //this.isLoaderdiv = true;
          // reader.readAsDataURL(file);
          // reader.onload = () => {
          //   this.commentForm.patchValue({
          //     commentfile: reader.result
          //   });
          // }
        } else {
          alert("Please choose < 4MB Documents")
          this.commentForm.controls['commentfile'].setValue(null);
        }
      } else {
        alert("Please choose images/pdf")
        this.commentForm.controls['commentfile'].setValue(null);

      }
    } else {
      alert("Please choose the file");
      this.commentForm.controls['commentfile'].setValue(null);
    }
  }

  fileSelectionEvent() {
    const reader = new FileReader();

    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        // alert(file.size)
        if (file.size <= 4194304) {
          this.isLoaderdiv = true;
          reader.readAsDataURL(file);
          // reader.onload = () => {
          // this.documentGrp.patchValue({
          //   file: reader.result
          // });
          //alert(file)
          //if (this.property != null) {
          //  this.propertyId = this.property.id;
          //}
          // alert(this.propertyId)
          this.EgazeService.savePropertyDoc(this.sfile, this.propertyId, this.user.loginId).subscribe(result => {
            this.isLoaderdiv = false;
            this.documentGrp.controls['file'].setValue("");

            this.sfile = null;
            // this.isLoaderdiv = true;
            this.getPrpopertyDocs(this.propertyId);
          }, error => {
            //alert(JSON.stringify(error));
          });
          // };
        } else {
          alert("Please choose < 4MB Documents");
          this.documentGrp.controls['file'].setValue("");
        }
      } else {
        alert("Please choose images/pdf");
        this.documentGrp.controls['file'].setValue("");
      }
    } else {
      alert("Please choose the file");
      this.documentGrp.controls['file'].setValue("");
    }
  }


  addItem(): void {
    var lemtn: any = false;
    this.items.forEach(element => {
      if (element.downoladUrl === '') {
        lemtn = true;
        return false

      }
      return true;
    });
    if (lemtn) {
      alert("Please upload the file and then choose Add more")
    } else {
      if (this.lengthCheckToaddMore <= 14) {
        this.lengthCheckToaddMore = this.lengthCheckToaddMore + 1;
        this.items.push({ "pdoc": this.lengthCheckToaddMore + "", "downoladUrl": "" });
      } else {
        alert("You can choose maximum of 15 documents")
      }

    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    //alert(JSON.stringify(this.items))
    this.lengthCheckToaddMore = this.lengthCheckToaddMore - 1;
  }
  getPrpopertyDocs(propertyId) {
    this.isLoaderdiv = true;
    this.EgazeService.getPrpopertyDocs(propertyId).subscribe(result => {
      this.propertydocs = result;
      //alert(this.propertydocs)
      this.isLoaderdiv = false;
      //this.sfile = null;
    }, error => {
      // alert(JSON.stringify(error));
    });
  }
  commentFun(description) {
    this.submitted = true;
    //alert(JSON.stringify(description.value));
    if (this.commentForm.valid) {
      this.isLoading = true;
      this.EgazeService.savePropertyComments(this.propertyId, this.user1.loginId, "0", 'Customer', description.value.commentfield, description.value.typeofProperty, this.sfile).subscribe(result => {
        if (result) {
          this.submitted = false;
          this.commentForm.controls['commentfile'].setValue("");
          this.commentForm.controls['commentfield'].setValue("");
          this.sfile = null;
          this.isLoading = false;

        }
        this.getPrpopertyComments(this.propertyId);
      }, error => {
        this.isLoading = false;
      });

    }

  }


  comments: any = [];
  getPrpopertyComments(description) {
    this.EgazeService.getPrpopertyComments(this.propertyId).subscribe(result => {
      this.comments = result;
    }, error => {
    });
  }

  getDownloadUrl(id) {
    window.location.href = this.EgazeService.getPropertyDocURL(id);
  }
  getporpertyCommentdocDownloadUrl(id) {
    window.location.href = this.EgazeService.getPropertyCommentDocURL(id);
  }

  // removedoc(id) {
  //   this.EgazeService.removePropertyDoc(id).subscribe(result => {
  //     this.getPrpopertyDocs(this.propertyId);
  //   }, error => {
  //   });
  // }

  modalDeleteDocument(id: string, documentId) {
    this.documentId = documentId;
    this.ModalPropertyService.open(id);
    //this.deldocFun(documentId);
  }

  deldocFun() {
    debugger;
    this.isLoading = true;
    this.EgazeService.removePropertyDoc(this.documentId).subscribe(result => {
      this.isLoading = false;
      this.getPrpopertyDocs(this.propertyId);
      this.documentId = '';
      this.ModalPropertyService.close('confirm-delete-document');
    }, error => {
    });
  }

  upgrade() {
    this.upgradePlanmessage = false;
    this.upgradePlanprocess = true;
    //window.location.href = AppConstants.packageURL;
  }
upgraderequestsucc='';
  upgradePlanFun() {
    debugger;
    this.errorMsg = '';
    if (this.upgradePlanForm.valid) {
      this.isLoading = true;
      this.submitted = false;

      this.EgazeService.upgradePackageRequest(this.upgradePlanForm.value, this.user.email).subscribe(result => {
        this.isLoading = false;
        this.upgraderequestsucc='Your Upgrade request sent to Admin.Admin will contact you soon.'
        this.upgradePlanForm.controls['plandetailsField'].setValue("");
      }, error => {
        this.isLoaderdiv = false;
        this.errorMsg = 'Server error has been occurred. Please try later.';
      });

    }
    else {
      this.submitted = true;
    }


  }


}
