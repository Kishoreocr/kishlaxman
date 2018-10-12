import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class NonceQueryParamInterceptorService implements HttpInterceptor {

  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Checks whether this is IE, and this is a GET request
    //alert(navigator.userAgent)
    if (true) {

      const modifiedRequest = req.clone(
          {setParams: {nocache: Date.now().toString()}}
      );
alert(JSON.stringify(modifiedRequest));
      return next.handle(modifiedRequest);

    } else {
      //return next.handle(req);
    }
  }

}
