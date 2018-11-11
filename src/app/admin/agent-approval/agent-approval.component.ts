import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../../services/egaze.service';
import { ModalService } from '../../admin/service/modal.service';

@Component({
  selector: 'app-agent-approval',
  templateUrl: './agent-approval.component.html',
  styleUrls: ['./agent-approval.component.css']
})
export class AgentApprovalComponent implements OnInit {
  customers: any = [];
  agentDetails: any;
  
  agentresult: any;
  alerts: any;
  constructor(private EgazeService: EgazeService, private modalService: ModalService) {
    this.getCustomerDetails();
    
    this.getAlerts();
    // this.dataArray;
  }

  ngOnInit() {
    this.getCustomerDetails();
  }
  getAlerts() {
    this.EgazeService.getAlerts(3).subscribe(result => {
     // debugger;
      this.alerts = result;
    }, error => {
    });
  }

  getCustomerDetails() {
    this.EgazeService.getAgentApprovalDetails().subscribe(result => {
      this.customers = result;
    }, error => {
    });
  }

  openModal(id: string, cust) {
    this.updateuserstatus='';
    this.modalService.open(id);
    this.agentDetails = cust;
    this.userstatus=cust.status;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
status:any;
userstatus:any;
updateuserstatus:any='';
agentApprovalReject(obj) {
    
    if(obj.status=='P'){
      status='A';
    }else{
      status='P';
    }
    this.EgazeService.updateAgenapprovalReject(obj.loginId,status).subscribe(result => {
      this.agentresult = result;
     this.getCustomerDetails();
     if (status === 'A') {
      this.updateuserstatus = 'Agent is Approved';
      this.userstatus = 'A';
    } else {
      this.updateuserstatus = 'Agent is Reverted';
      this.userstatus = 'P';
    }
    });
  }

}