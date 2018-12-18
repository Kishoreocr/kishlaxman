import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../../services/egaze.service';
import { SessionstorageService } from '../../services/sessionstorage.service';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent implements OnInit {
user:any;
properties:any=[];
  constructor(private sessionstorageService: SessionstorageService,private EgazeService:EgazeService) { 
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");

  }

  ngOnInit() {
    this.getAgentProperentties();
  }
  getAgentProperentties() {
    this.EgazeService.getAgentProperentties(this.user.loginId).subscribe(result => {
      this.properties = result;
    }, error => {

    });
  }
}
