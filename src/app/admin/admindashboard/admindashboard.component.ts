import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { ModalDialogService, IModalDialogSettings } from 'ngx-modal-dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { EgazeService } from '../../services/egaze.service';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { LoadingDivComponent } from '../../loading-div/loading-div.component';
import { AppConstants } from '../../services/constants';
import { ModalService } from '../../admin/service/modal.service';

import { PropertyApprovalComponent } from '../../admin/property-approval/property-approval.component';

//import { AgentApprovalComponent } from '../agent-approval/agent-approval.component';
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
  adminalertTab: boolean = false;
  profileTab: boolean = false;
  modalService: any;
  viewRef: any;
  propertyForm1: FormGroup;
  submitted = false;
  isEditDisabled: boolean = false;
  userEditprofileFlag: boolean = false;
  propertystatus: any;

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

  customerdetailstabModal = true;
  customerpackagestabModal = false;
  customerpropertiestabModal = false;

  propertyDetails: boolean = false;
  propertyDocuments: boolean = false;
  loginId: any;

  documentGrp: FormGroup;
  commentsmsg: any;
  user: any;
  commentForm: FormGroup;
  adminalerts: any;
  propertydocs: any;
  documentId: any;
  feedbackTab = false;
  searchGrp: FormGroup;
  searchGrpcust: FormGroup;
  custlist = true;
  custdetailstabs = false;
  custtransactions: any = [];
  userproperties: any = [];

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
      propertyHolderName: ['', [Validators.required,Validators.minLength(2)]],
      relationship: ['', Validators.required],
      doorNo: ['', [Validators.required, Validators.minLength(6)]],
      documentNo: ['', Validators.required],
      boundariesEast: ['', [ Validators.minLength(3)]],
      boundariesWest: ['', [ Validators.minLength(3)]],
      boundariesNorth: ['',[ Validators.minLength(3)]],
      boundariesSouth: ['',[ Validators.minLength(3)]],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      subRegisterOffice: ['', [ Validators.minLength(6)]],
      extentOfProperty: ['', Validators.required],
      address1: ['', [Validators.required, Validators.minLength(6)]],
      address2: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4)]]
      // country: ['', Validators.required]
    });

    this.commentForm = this.formBuilder.group({
      commentfield: ['', [Validators.required, Validators.minLength(3)]],
      typeofProperty: ['', Validators.required],
      commentfile: [null]
    });

    this.commentForm.controls['typeofProperty'].setValue("nochanges");
    this.documentGrp = this.formBuilder.group({
      file: [null, Validators.required]

    });
    this.searchGrp = this.formBuilder.group({
      searchType: [null],
      searchText: [null],
      searchTextdate1: [null],
      searchTextdate2: [null]

    });
    this.searchGrp.controls['searchType'].setValue("propertyHolderName");
    this.searchGrpcust = this.formBuilder.group({
      searchTypecust: [null],
      searchTextcust: [null],
      searchTextcustdate1: [null],
      searchTextcustdate2: [null]

    });
    this.searchGrpcust.controls['searchTypecust'].setValue("firstName");
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
        this.adminalertTab = false;
        this.feedbackTab = false;
        this.searchGrp.controls['searchType'].setValue("propertyHolderName");
        this.searchGrp.controls['searchText'].setValue("");
        this.custlist = true;
        this.custdetailstabs = false;
        break;
      case 'Alerts':
        this.propertyTab = false;
        this.alertsTab = true;
        this.transactionsTab = false;
        this.adminalertTab = false;
        this.profileTab = false;
        this.getPropertyDetails();
        this.feedbackTab = false;
        this.searchGrpcust.controls['searchTypecust'].setValue("firstName");
        this.searchGrpcust.controls['searchTextcust'].setValue("");
        this.getCustomerDetails();
        this.custlist = true;
        this.custdetailstabs = false;
        break;
      case 'Transactions':
        this.propertyTab = false;
        this.alertsTab = false;
        this.transactionsTab = true;
        this.adminalertTab = false;
        this.profileTab = false;
        this.feedbackTab = false;
        this.custlist = true;
        this.custdetailstabs = false;
        break;
      case 'Profile':
        this.propertyTab = false;
        this.alertsTab = false;
        this.transactionsTab = false;
        this.adminalertTab = false;
        this.profileTab = true;
        this.updateuserProfilestatus = "";
        this.isEditDisabled = false;
        this.feedbackTab = false;
        this.custlist = true;
        this.custdetailstabs = false;
        break;
      case 'adminalert':
        this.propertyTab = false;
        this.alertsTab = false;
        this.transactionsTab = false;
        this.adminalertTab = true;
        this.profileTab = false;
        this.feedbackTab = false;
        this.getAlerts();
        this.custlist = true;
        this.custdetailstabs = false;
        break;
      case 'feedback':
        this.propertyTab = false;
        this.alertsTab = false;
        this.transactionsTab = false;
        this.adminalertTab = false;
        this.profileTab = false;
        this.feedbackTab = true;
        this.custlist = true;
        this.custdetailstabs = false;
        //this.getAlerts();
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
        this.getPrpopertyComments();
        break;
      case 'CustomerDetailsTab':
        this.customerdetailstabModal = true;
        this.customerpackagestabModal = false;
        this.customerpropertiestabModal = false;
        break;
      case 'CustomerPackagesTab':
        this.getTransactions();
        this.customerdetailstabModal = false;
        this.customerpackagestabModal = true;
        this.customerpropertiestabModal = false;
        break;
      case 'CustomerPropertiesTab':
        this.custproperties();
        this.customerdetailstabModal = false;
        this.customerpackagestabModal = false;
        this.customerpropertiestabModal = true;
        break;
      default:
        this.propertyTab = true;
        this.propertyDetails = true;
        this.propertytabModal = true;
    }
  }
  custdetails(cust) {
    this.custlist = false;
    this.custdetailstabs = true;
    this.customer = cust;
  }
  openModal(id: string, cust) {
    this.submitted=false;
    this.propertytabModal = true;
    this.documentstabModal = false;
    this.commentstabModal = false;
    this.updateuserProfilestatus = '';
    // this.customer = cust;
    this.property = cust;

    this.modalService1.open(id);
    this.isEditDisabled = false;
    this.loginId = this.property.loginId;
    this.propertyId = this.property.id;
    this.propertystatus = this.property.status;
    this.getDistricts(this.property.state);
    this.getMandals(this.property.state,this.property.district);
    this.getVillages(this.property.state,this.property.district,this.property.mandal);
    this.propertyForm1.setValue({
      propertyType: this.property.propertyType,
      propertyHolderName: this.property.propertyHolderName,
      relationship: this.property.relationship,
      doorNo: this.property.doorNo,
      documentNo: this.property.documentNo,
     // boundaries: "boundaries",
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
      zip: this.property.zip
      //  country: this.property.country
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
      this.customersbkp = result;
    }, error => {

    });

  }


  /** property Tab for view and edit  */
  propertyeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.errorMsg = '';
  }

  getPropertyDetails() {
   // this.updateuserProfilestatus = "";
    this.EgazeService.getPropertyApi().subscribe(result => {
      this.propertyApproval = result;
      this.propertyApproval1 = result;
      this.isEditDisabled = false;
    }, error => {

    });
  }

  profileeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.submitted = false;
  }
  custproperties() {

    this.EgazeService.getAllproperties(this.customer.loginId).subscribe(
      result => {
        //debugger;
        this.userproperties = result;
      },
      error => { }
    );

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
      this.EgazeService.updatePropertybyAdmin(propertyForm1.value, this.loginId, this.propertyId,this.property.status).subscribe(result => {
        this.isLoading = false;
        //alert("dsdd="+result)
       
        this.updateuserProfilestatus = "Property updated Successfully";
        this.isEditDisabled = false;
        this.isLoaderdiv = false;
        this.getPropertyDetails();
       // alert("suss"+this.updateuserProfilestatus)
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
    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        if (file.size <= 4194304) {
          this.isLoading = true;
          if (this.property != null) {
            this.propertyId = this.property.id;
          }
          this.EgazeService.savePropertyDoc(this.sfile, this.propertyId, this.loginId).subscribe(result => {
            this.isLoading = false;
            this.sfile = null;
            this.getPrpopertyDocs();
            this.documentGrp.controls['file'].setValue("");

          }, error => {
            //            alert(JSON.stringify(error));
          });
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
  getPrpopertyDocs() {
    this.isLoaderdiv = true;
    this.items = [];
    this.EgazeService.getPrpopertyDocs(this.propertyId).subscribe(result => {
      this.propertydocs = result;
      this.isLoaderdiv = false;
      //this.sfile = null;
    }, error => {
      alert(JSON.stringify(error));
    });
  }
  getTransactions() {
    this.isLoaderdiv = true;
    this.EgazeService.getCustomerPackages(this.customer.loginId).subscribe(
      result => {
        this.custtransactions = result;
        this.isLoaderdiv = false;
      }

    );
  }
  custback() {
    this.custdetailstabs = false;
    this.custlist = true;
    this.propertyTab = true;
    this.alertsTab = false;
    this.transactionsTab = false;
    this.profileTab = false;
    this.adminalertTab = false;
    this.feedbackTab = false;
    this.customerdetailstabModal = true;
    this.customerpackagestabModal = false;
    this.customerpropertiestabModal = false;
  }
  commentFun(description) {
    this.submitted = true;
    //alert(description.value.commentfield)

    if (this.commentForm.valid) {
      this.isLoaderdiv = true;

      this.EgazeService.savePropertyComments(this.propertyId, "0", this.loginId, 'Admin', description.value.commentfield, description.value.typeofProperty, this.sfile).subscribe(result => {
        this.isLoaderdiv = false;

        this.commentsmsg = result;
        if (this.commentsmsg) {
          this.submitted = false;
          this.commentForm.controls['commentfile'].setValue("");
          this.commentForm.controls['commentfield'].setValue("");
          this.sfile = null;
        }
        //alert('success' + this.commentsmsg);
        this.getPrpopertyComments();
      }, error => {
        //alert('error' + error);
      });
    }
  }


  comments: any = [];
  getPrpopertyComments() {
    this.EgazeService.getPrpopertyComments(this.propertyId).subscribe(result => {

      this.comments = result;
      // alert('success' + this.commentsmsg);

    }, error => {
      //alert('error' + error);
    });
  }
  fileSelectionEventcomments(event: any) {
    const [file] = event.target.files;
    if (event.target.files && event.target.files.length) {
      this.sfile = file;
    }
    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        if (file.size <= 4194304) {
          //this.isLoading = true;

        } else {
          alert("Please choose < 4MB Documents")
          this.commentForm.controls['commentfile'].setValue("");
        }
      } else {
        alert("Please choose images/pdf")
        this.commentForm.controls['commentfile'].setValue("");

      }
    } else {
      alert("Please choose the file");
      this.commentForm.controls['commentfile'].setValue("");
    }
  }
  getporpertyCommentdocDownloadUrl(id) {
    window.location.href = this.EgazeService.getPropertyCommentDocURL(id);
  }
  getAlerts() {
    this.EgazeService.getAlerts(1).subscribe(result => {
      debugger;
      this.adminalerts = result;
    }, error => {

    });

  }
  getDownloadUrl(id) {
    window.location.href = this.EgazeService.getPropertyDocURL(id);
  }
  // removedoc(id) {
  //   this.EgazeService.removePropertyDoc(id).subscribe(result => {
  //     this.getPrpopertyDocs();
  //   }, error => {
  //   });

  // }

  modalDeleteDocument(id: string, documentId) {
    this.documentId = documentId;
    this.modalService1.open(id);
    //this.deldocFun(documentId);
  }

  deldocFun() {
    debugger;
    this.isLoading = true;
    this.EgazeService.removePropertyDoc(this.documentId).subscribe(result => {
      this.isLoading = false;
      this.getPrpopertyDocs();
      this.documentId = '';
      this.modalService1.close('confirm-delete-document');
    }, error => {
    });
  }
  approve(status) {
    this.isLoading = true;

    this.EgazeService.updatePropertyStatus(this.propertyId, status).subscribe(result => {
      this.isLoading = false;
      this.getPropertyDetails();
      if (status === 'A') {
        this.updateuserProfilestatus = 'Property is Approved';
        this.propertystatus = 'A';
      } else {
        this.updateuserProfilestatus = 'Property is Reverted';
        this.propertystatus = 'P';
      }

    }, error => {
    });

  }
  filterpropertyApproval: any[] = [];

  searchType: any = 'propertyHolderName';
  propertyApproval1: any;
  filterItem() {
    //alert(this.searchGrp.value.searchTextdate1)
    if (this.searchType === 'daterange') {
      if (this.searchGrp.value.searchTextdate1 === null) {
        alert("Please select from date")
      } else if (this.searchGrp.value.searchTextdate2 === null) {
        alert("Please select to date")

      } else {
        this.propsearch();
      }
    } else {
      this.propsearch();
    }

  }
  propsearch() {
    this.propertyApproval = this.propertyApproval1;
    //this.getPropertyDetails();
    this.filterpropertyApproval = [];
    //alert(this.searchType +'---'+this.searchGrp.value.searchText)
    //if(!this.searchGrp.value.searchText) this.assignCopy(); //when nothing has typed
    this.propertyApproval = this.propertyApproval.filter(
      item => {
        if (this.searchType === 'propertyHolderName') {
          if (item.propertyHolderName.toLowerCase().indexOf(this.searchGrp.value.searchText.toLowerCase()) > -1) {
            this.filterpropertyApproval.push(item);
          }
        } else if (this.searchType === 'state') {
          if (item.state.toLowerCase().indexOf(this.searchGrp.value.searchText.toLowerCase()) > -1) {
            this.filterpropertyApproval.push(item);
          }
        }
        else if (this.searchType === 'city') {
          if (item.city.toLowerCase().indexOf(this.searchGrp.value.searchText.toLowerCase()) > -1) {
            this.filterpropertyApproval.push(item);
          }
        }
        else if (this.searchType === 'documentNo') {
          if (item.documentNo.toLowerCase().indexOf(this.searchGrp.value.searchText.toLowerCase()) > -1) {
            this.filterpropertyApproval.push(item);
          }
        }
        else if (this.searchType === 'district') {
          if (item.district.toLowerCase().indexOf(this.searchGrp.value.searchText.toLowerCase()) > -1) {
            this.filterpropertyApproval.push(item);
          }
        } else if (this.searchType === 'daterange') {
          var date = new Date(item.addedDate);
          var fdate = new Date(this.searchGrp.value.searchTextdate1);
          var tdate = new Date(this.searchGrp.value.searchTextdate2);
          if (date.getTime() >= fdate.getTime() && date.getTime() <= tdate.getTime()) {
            this.filterpropertyApproval.push(item);
          }
        }
      }
    );
    this.propertyApproval = [];
    this.propertyApproval = this.filterpropertyApproval;

    //console.log(this.filterpropertyApproval);
  }

  filtercust: any[] = [];
  customersbkp: any;
  searchTypecust: any = 'firstName';
  filterItemcust() {

    if (this.searchTypecust === 'daterange') {
      if (this.searchGrpcust.value.searchTextcustdate1 === '') {
        alert("Please select from date")
      } else if (this.searchGrpcust.value.searchTextcustdate2 === '') {
        alert("Please select to date")

      } else {
        this.custsearch();
      }
    } else {
      this.custsearch();
    }

  }

  custsearch() {
    this.customers = this.customersbkp;
    this.filtercust = [];
    this.customers = this.customers.filter(
      item => {
        if (this.searchTypecust === 'firstName') {
          if (item.firstName.toLowerCase().indexOf(this.searchGrpcust.value.searchTextcust.toLowerCase()) > -1) {
            this.filtercust.push(item);
          }
        } else if (this.searchTypecust === 'state') {
          if (item.state.toLowerCase().indexOf(this.searchGrpcust.value.searchTextcust.toLowerCase()) > -1) {
            this.filtercust.push(item);
          }
        }
        else if (this.searchTypecust === 'city') {
          if (item.city.toLowerCase().indexOf(this.searchGrpcust.value.searchTextcust.toLowerCase()) > -1) {
            this.filtercust.push(item);
          }
        }
        else if (this.searchTypecust === 'email') {
          if (item.email.toLowerCase().indexOf(this.searchGrpcust.value.searchTextcust.toLowerCase()) > -1) {
            this.filtercust.push(item);
          }
        }
        else if (this.searchTypecust === 'mobileNo') {
          if (item.mobileNo.toLowerCase().indexOf(this.searchGrpcust.value.searchTextcust.toLowerCase()) > -1) {
            this.filtercust.push(item);
          }
        } else if (this.searchTypecust === 'daterange') {
          var date = new Date(item.addedDate);
          var fdate = new Date(this.searchGrpcust.value.searchTextcustdate1);
          var tdate = new Date(this.searchGrpcust.value.searchTextcustdate2);
          if (date.getTime() >= fdate.getTime() && date.getTime() <= tdate.getTime()) {
            this.filtercust.push(item);
          }
        }


      }
    );
    this.customers = [];
    this.customers = this.filtercust;

  }
  daterangecust: any = false;
  daterange: any = false;

  getSearchTypecust(event) {
    this.searchTypecust = "" + event;
    if (this.searchTypecust === 'daterange') {
      this.searchGrpcust.controls['searchTextcustdate1'].setValue("");
      this.searchGrpcust.controls['searchTextcustdate2'].setValue("");

      this.daterangecust = true;
    } else {
      this.daterangecust = false;
    }
  }
  getSearchType1(event) {
    this.searchType = "" + event;
    if (this.searchType === 'daterange') {
      this.searchGrp.controls['searchTextdate1'].setValue("");
      this.searchGrp.controls['searchTextdate2'].setValue("");

      this.daterange = true;
    } else {
      this.daterange = false;
    }
  }
  propClear() {
    this.propertyApproval = this.propertyApproval1;
    this.searchGrp.controls['searchText'].setValue("");
    this.searchGrp.controls['searchTextdate1'].setValue("");
    this.searchGrp.controls['searchTextdate2'].setValue("");
    this.searchGrp.controls['searchType'].setValue("propertyHolderName");
  }
  custClear() {
    this.customers = this.customersbkp;
    this.searchGrpcust.controls['searchTextcust'].setValue("");
    this.searchGrpcust.controls['searchTextcustdate1'].setValue("");
    this.searchGrpcust.controls['searchTextcustdate2'].setValue("");
    this.searchGrpcust.controls['searchTypecust'].setValue("firstName");
  }
  isCharts(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8)
      return true;
    else {
      return false;
    }
  }

  getstate(event) {
    this.propertyForm1.value.state = "" + event;
    this.propertyForm1.value.district = "";
    this.getDistricts("" + event);
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  getdistrict(event){
    this.propertyForm1.value.district = "" + event;
    this.propertyForm1.value.mandal="";
    this.getMandals(this.propertyForm1.value.state,"" + event);
  }
  getmandal(event){
    this.propertyForm1.value.mandal = "" + event;
    this.propertyForm1.value.villageCity = "";
    this.getVillages(this.propertyForm1.value.state,this.propertyForm1.value.district,"" + event);
  }
  getvillage(event){
    this.propertyForm1.value.villageCity = "" + event;
  }

  districts:any=[];
  getDistricts(stateCode) {
    this.EgazeService.getDistricts(stateCode).subscribe(result => {
     // debugger;
      this.districts = result;
    }, error => {

    });

  }
  mandals:any=[];
  getMandals(stateCode, districtCode) {
    this.EgazeService.getMandals(stateCode,districtCode).subscribe(result => {
      //debugger;
      this.mandals = result;
    }, error => {

    });

  }
  villages:any=[];
  getVillages(stateCode, districtCode, mandalCode) {

    this.EgazeService.  getVillages(stateCode, districtCode, mandalCode).subscribe(result => {
      //debugger;
      this.villages = result;
    }, error => {

    });

  }
 
}
