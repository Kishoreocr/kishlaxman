import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../../services/egaze.service';

@Component({
  selector: 'app-agent-approval',
  templateUrl: './agent-approval.component.html',
  styleUrls: ['./agent-approval.component.css']
})
export class AgentApprovalComponent implements OnInit {

  dataArray : any = {
    'Name':'laxman'
  }
  alerts:any;
  constructor(private EgazeService: EgazeService) {

    this.getAlerts();
   // this.dataArray;
   }

  ngOnInit() {
  }
  getAlerts() {
    this.EgazeService.getAlerts(3).subscribe(result => {
      debugger;
      this.alerts = result;
    }, error => {

    });

  }
}
