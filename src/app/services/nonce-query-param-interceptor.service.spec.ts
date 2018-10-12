import { TestBed, inject } from '@angular/core/testing';

import { NonceQueryParamInterceptorService } from './nonce-query-param-interceptor.service';

describe('NonceQueryParamInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonceQueryParamInterceptorService]
    });
  });

  it('should be created', inject([NonceQueryParamInterceptorService], (service: NonceQueryParamInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
