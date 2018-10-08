import { Component, OnInit } from '@angular/core';
import { EgazeService } from './../services/egaze.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedbacks:any;
  constructor(private egazeService: EgazeService) {
    this.getAllContactUsRequests();
   }

  ngOnInit() {
  }

  getAllContactUsRequests() {
    this.egazeService.getAllContactUsRequestsByStatus('SP').subscribe(result => {
     // alert(this.feedbacks)
      this.feedbacks = result;
    }, error => {
    });
  }
}
