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
  dataArray: any = {
    'Name': 'laxman'
  }
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
      debugger;
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
    this.modalService.open(id);
    this.agentDetails = cust;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

  agentApprovalReject(obj) {
    this.EgazeService.updateAgenapprovalReject(obj).subscribe(result => {
      this.agentresult = result;
    });
  }

}