import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AppConstants } from '../services/constants';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

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
  public payPalConfig?: PayPalConfig;

  constructor(private route: ActivatedRoute, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService) {

  }
  pres: any;

  ngOnInit() {
    this.initConfig();

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
      //this.payuform.amount = this.pres.price;
      this.payuform.amount = 1;
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
  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'ATDBazd-7r4sYy2MjJQeIjjZIY9KV04PlTax_nRXoBKIns2t0QvF1JwF2AIlmpGs8K4v_t1DJwjTiR_i',
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete'+JSON.stringify(data));
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError'+err);
      },
      transactions: [
        {
          amount: {
            total: 1,
            currency: 'USD',
            // details: {
            //   subtotal: 30.00,
            //   tax: 0.07,
            //   shipping: 0.03,
            //   handling_fee: 1.00,
            //   shipping_discount: -1.00,
            //   insurance: 0.01
            // }
          },
          custom: 'Custom value',
          item_list: {
            items: [
              {
                name: 'Package',
                description: 'Package',
                quantity: 1,
                price: 1,
               // tax: 0.01,
                sku: '1',
                currency: 'USD'
              }],
            shipping_address: {
              recipient_name: 'Brian Robinson',
              line1: '4th Floor',
              line2: 'Unit #34',
              city: 'San Jose',
              country_code: 'US',
              postal_code: '95131',
              phone: '9703047975',
              state: 'CA'
            },
          },
        }
      ],
      note_to_payer: 'Contact us if you have troubles processing payment'
    });
  }

}
