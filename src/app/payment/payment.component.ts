import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AppConstants } from '../services/constants';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payuform: any = {};
  res: any;
  disablePaymentButton: boolean = true;
  user: any;
  package: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService) {

  }
  pres: any;

  ngOnInit() {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    console.log(this.user);
    this.route.queryParamMap.subscribe(params => {
      if (params.get('package')) {
        this.package = params.get('package');
      }
    });
    this.isLoading = true;

    this.EgazeService.getPackage(this.package).subscribe(data => {
      this.isLoading = false;

      this.pres = data;
      this.payuform.productinfo = this.pres.packageName;
      this.payuform.amount = this.pres.price;
      this.payuform.packageId = this.pres.id;
    });
    this.payuform.custId = this.user.loginId;
    this.payuform.email = this.user.email;
    this.payuform.firstname = this.user.firstName;
    this.payuform.phone = this.user.mobile;
    // if(this.package === 1){
    //   this.payuform.productinfo = "MONTHLY";
    // }else{
    //   this.payuform.productinfo = "YEARLY";
    // }
    //this.payuform.amount = "11.00";
    this.payuform.salt = AppConstants.paymentSalt;
    this.payuform.serviceprovider = AppConstants.paymentServiceProvider;
    this.payuform.paymentaction = AppConstants.paymentActionurl;
  }
  confirmPayment() {
    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount,
      custId: this.payuform.custId,
      packageId: this.payuform.packageId
    }
    //alert(paymentPayload)
    this.isLoading = true;
    this.EgazeService.sendpaymnet(paymentPayload).subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.res = data;
      this.payuform.txnid = this.res.txnId;
      this.payuform.surl = AppConstants.paymentSurl;
      this.payuform.furl = AppConstants.paymentFurl;
      this.payuform.key = AppConstants.paymentKey;
      this.payuform.hash = this.res.hash;
      this.disablePaymentButton = false;

    },
      error => {

      });
  }

}
