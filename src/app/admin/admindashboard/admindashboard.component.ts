import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { ModalDialogService, IModalDialogSettings } from 'ngx-modal-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../../services/egaze.service';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { LoadingDivComponent } from '../../loading-div/loading-div.component';
import { AppConstants } from '../../services/constants';
import { ModalService } from '../../admin/service/modal.service';

import { PropertyApprovalComponent } from '../../admin/property-approval/property-approval.component';

export interface PropertyDoc {
  pdoc: String;
  downoladUrl: String;
}
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})

export class AdmindashboardComponent implements OnInit {

  viewProperties: boolean = false;
  activeSelected: boolean = false;
  propertyTab: boolean = false;
  alertsTab: boolean = false;
  transactionsTab: boolean = false;
  profileTab: boolean = false;
  modalService: any;
  viewRef: any;
  propertyForm1: FormGroup;
  submitted = false;
  isEditDisabled: boolean = false;
  userEditprofileFlag: boolean = false;


  updateuserProfile: any;
  updateuserProfilestatus: any;
  isLoading: boolean;
  alerts: any;

  isLoaderdiv: boolean = false;
  errorMsg: string = '';
  transactions: any;

  somedata: any[] = [{ "id": "11" }, { "name": "laxman" }];
  customers: any = [];
  customer: any = '';
  propertyApproval: any;
  property: any = '';
  propertyId: any;

  propertytabModal: boolean = true;
  documentstabModal: boolean = false;
  commentstabModal: boolean = false;

  propertyDetails: boolean = false;
  propertyDocuments: boolean = false;
  loginId: any;

  documentGrp: FormGroup;
  commentsmsg: any;
  user: any;
  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private elem: ElementRef,
    private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, private modalService1: ModalService) {
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.getCustomerDetails();
    this.getPropertyDetails();
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
  }
  ngOnInit() {

    this.submitted = false;

    this.propertyTab = true;
    this.isEditDisabled = false;
    this.userEditprofileFlag = false;
    this.submitted = false;
    //this.getPropertyDetails();

    this.propertytabModal = true;
    this.propertyDetails = true;

    this.propertyForm1 = this.formBuilder.group({
      propertyType: ['', Validators.required],
      propertyHolderName: ['', Validators.required],
      relationship: ['', Validators.required],
      doorNo: ['', Validators.required],
      documentNo: ['', Validators.required],
      boundaries: ['', Validators.required],
      boundariesEast: [''],
      boundariesWest: [''],
      boundariesNorth: [''],
      boundariesSouth: [''],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      subRegisterOffice: ['', Validators.required],
      extentOfProperty: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.commentForm = this.formBuilder.group({
      commentfield: ['', Validators.required]
    });
    this.documentGrp = this.formBuilder.group({
      file: [null, Validators.required]

    });
  }
  get c() {
    return this.commentForm.controls;
  }
  get f() {
    return this.propertyForm1.controls;
  }

  getType(event) {
    this.propertyForm1.value.typeofProperty = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  userdashTabs(activeTab) {
    this.updateuserProfilestatus = "";
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
        this.getPropertyDetails();
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
        this.isEditDisabled = false;
        break;
      case 'PropertyDetailsTab':
        this.propertytabModal = true;
        this.documentstabModal = false;
        this.commentstabModal = false;
        this.isEditDisabled = false;
        this.getPropertyDetails();
        this.propertyDetails = true;
        this.propertyDocuments = false;


        break;
      case 'DocumentsTab':
        this.propertytabModal = false;
        this.documentstabModal = true;
        this.commentstabModal = false;
        this.propertyDetails = false;
        this.propertyDocuments = true;
        this.isEditDisabled = false;
        this.getPrpopertyDocs();

        break;
      case 'CommentsTab':
        this.propertytabModal = false;
        this.documentstabModal = false;
        this.commentstabModal = true;
        this.isEditDisabled = false;
        break;


      default:
        this.propertyTab = true;
        this.propertyDetails = true;
        this.propertytabModal = true;
    }
  }

  openModal(id: string, cust) {

    this.customer = cust;
    this.property = cust;

    this.modalService1.open(id);
    this.isEditDisabled = false;
    this.loginId = this.property.loginId;
    this.propertyId = this.property.id;

    this.propertyForm1.setValue({
      propertyType: this.property.propertyType,
      propertyHolderName: this.property.propertyHolderName,
      relationship: this.property.relationship,
      doorNo: this.property.doorNo,
      documentNo: this.property.documentNo,
      boundaries: "boundaries",
      boundariesEast: this.property.boundariesEast,
      boundariesWest: this.property.boundariesWest,
      boundariesNorth: this.property.boundariesNorth,
      boundariesSouth: this.property.boundariesSouth,
      mandal: this.property.mandal,
      district: this.property.district,
      subRegisterOffice: this.property.subRegisterOffice,
      extentOfProperty: this.property.extentOfProperty,
      address1: this.property.address1,
      address2: this.property.address2,
      city: this.property.city,
      state: this.property.state,
      zip: this.property.zip,
      country: this.property.country
     // status: this.property.status

    });
  }

  closeModal(id: string) {
    this.modalService1.close(id);
  }
  getCustomerDetails() {
    this.EgazeService.getCustomerDetails().subscribe(result => {
      //debugger;
      this.customers = result;
    }, error => {

    });

  }


  /** property Tab for view and edit  */
  propertyeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.errorMsg = '';
  }

  getPropertyDetails() {
    this.EgazeService.getPropertyApi().subscribe(result => {
      this.propertyApproval = result;
      this.isEditDisabled = false;
    }, error => {

    });
  }

  profileeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.submitted = false;
  }


  updatepropertyFun(propertyForm1) {
    if (!this.isEditDisabled) {
      this.submitted = false;
    }
    else {
      this.submitted = true;
    }

    this.errorMsg = '';
//alert(this.propertyForm1.valid)
    if (this.propertyForm1.valid) {
      this.isLoading = true;
//alert("dsdd")
      this.EgazeService.updatePropertybyAdmin(propertyForm1.value, this.loginId, this.propertyId).subscribe(result => {
        this.isLoading = false;
        //alert("dsdd="+result)
        const element = document.querySelector("#propertyDestination")
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.scroll(0, 0);
        this.updateuserProfilestatus = "Property updated Successfully";
        this.isEditDisabled = false;
          this.isLoaderdiv = false;
          //alert("suss")
      }, error => {
        this.isLoaderdiv = false;
       // alert("suss="+JSON.stringify(error));

        this.errorMsg = 'Server error has been occurred. Please try later.';
      });
    }
  }




  /*file*/
  public totalfiles: Array<File> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 0;
  items: Array<PropertyDoc> = [];
  sfile: File;
  importfile(event: any, i) {
    const [file] = event.target.files;
    if (event.target.files && event.target.files.length) {
      this.sfile = file;
    }
  }

  fileSelectionEvent(i) {
    const reader = new FileReader();

    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        if (file.size <= 4194304) {
          this.isLoaderdiv = true;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.documentGrp.patchValue({
              file: reader.result
            });
            if(this.property!=null){
              this.propertyId=this.property.id;
            }
           // alert(this.propertyId)
            this.EgazeService.savePropertyDoc(file,  this.propertyId,this.loginId).subscribe(result => {
              var id = JSON.stringify(result['id']);
              var down = this.EgazeService.getPropertyDocURL(id);
              this.items.splice(i, 1);
              this.items.push({ "pdoc": this.lengthCheckToaddMore + "", "downoladUrl": down });
              this.isLoaderdiv = false;
              this.sfile = null;
            }, error => {
              //alert(JSON.stringify(error));
            });
          };
        } else {
          alert("Please choose < 4MB Documents")
        }
      } else {
        alert("Please choose images/pdf")
      }
    } else {
      alert("Please choose the file");
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
  getPrpopertyDocs() {
    this.isLoaderdiv = true;
    //alert("customerId="+customerId)
    //alert("propertyId="+propertyId)
    this.items=[];
    this.EgazeService.getPrpopertyDocs(this.propertyId).subscribe(result => {
      var ids: any = result;
      this.lengthCheckToaddMore=0;
      Object.keys(ids).forEach(key => {
        //alert(ids[key]);

        this.items.push({ "pdoc": this.lengthCheckToaddMore + "", "downoladUrl": this.EgazeService.getPropertyDocURL(ids[key]) });
        this.lengthCheckToaddMore=this.lengthCheckToaddMore+1;
      });
       // alert(JSON.stringify(this.items))

      //alert(id)
      // var down = this.EgazeService.getPropertyDocURL(id);
      //this.items.splice(i, 1);
      // this.items.push({ "pdoc": this.lengthCheckToaddMore + "", "downoladUrl": down });
      this.isLoaderdiv = false;
      //this.sfile = null;
    }, error => {
      alert(JSON.stringify(error));
    });
  }
  commentFun(description) {
    debugger;

    this.submitted = true;
    if (this.commentForm.valid) {
      this.EgazeService.savePropertyComments(this.propertyId, this.loginId, this.user.loginId, 'admin', description.value).subscribe(result => {

        this.commentsmsg = result;
        if (this.commentsmsg) {
          this.submitted = false;
        }
        alert('success' + this.commentsmsg);

      }, error => {
        alert('error' + error);
      });
    }
  }

}
