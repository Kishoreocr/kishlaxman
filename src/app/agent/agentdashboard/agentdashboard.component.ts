import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../../services/egaze.service';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { ModalService } from '../../agent/service/modal.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent implements OnInit {
  user: any;
  properties: any = [];
  property: any;
  isLoading: boolean = false;
  commentForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private modalService1: ModalService, private sessionstorageService: SessionstorageService, private EgazeService: EgazeService) {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");

  }

  ngOnInit() {
    this.getAgentProperentties();
    this.commentForm = this.formBuilder.group({
      commentfield: ['', [Validators.required, Validators.minLength(3)]],
      typeofProperty: ['', Validators.required],
      commentfile: [null]
    });

    this.commentForm.controls['typeofProperty'].setValue("nochanges");
  }
  get c() { return this.commentForm.controls; }

  getAgentProperentties() {
    this.isLoading = true;
    this.EgazeService.getAgentProperentties(this.user.loginId).subscribe(result => {
      this.properties = result;
      this.isLoading = false;
    }, error => {

    });
  }
  propertytabModal: any;
  commentstabModal: any;
  propertyId: any;
  openModal(id: string, property, sts) {

    this.property = property;
    this.propertytabModal = true;
    this.commentstabModal = false;
    this.modalService1.open(id);
    //alert(this.property.id)
    this.propertyId = this.property.id;
    // this.propertyStatusCode = this.property.status;
    // this.getPrpopertyDocs(this.property.id)
  }

  closeModal(id: string) {
    this.modalService1.close(id);
    // this.upgraderequestsucc = '';
  }
  getType(event) {
    this.commentForm.value.typeofProperty = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  userdashTabs(activeTab) {

    //this.activeSelected = true;
    switch (activeTab) {
      case 'PropertyDetailsTab':
        this.propertytabModal = true;
        this.commentstabModal = false;
        break;
      case 'CommentsTab':
        this.propertytabModal = false;
        this.commentstabModal = true;
        this.getPrpopertyComments(this.propertyId);
        break;
      default:
        this.propertytabModal = true;
    }

  }
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

  commentFun(description) {

    //alert(JSON.stringify(description.value));
    if (this.commentForm.valid) {
      this.isLoading = true;

      this.EgazeService.savePropertyComments(this.propertyId, "0", this.user.loginId, 'Agent', description.value.commentfield, description.value.typeofProperty, this.sfile).subscribe(result => {
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
    else {
      this.submitted = true;
    }

  }


  comments: any = [];
  getPrpopertyComments(description) {
    this.EgazeService.getPrpopertyComments(this.propertyId).subscribe(result => {
      this.comments = result;
    }, error => {
    });
  }


  getporpertyCommentdocDownloadUrl(id) {
    window.location.href = this.EgazeService.getPropertyCommentDocURL(id);
  }


}
