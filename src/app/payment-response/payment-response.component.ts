import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../services/egaze.service';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.css']
})
export class PaymentResponseComponent implements OnInit {
  status: any;
  constructor(private EgazeService: EgazeService, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe(params => {

      this.status = params.get('status');
    });

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.status = params.get('status');
    });
   // alert(this.status)
  }

}
