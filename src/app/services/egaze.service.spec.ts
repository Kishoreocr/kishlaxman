import { TestBed, inject } from '@angular/core/testing';

import { EgazeService } from './egaze.service';

describe('EgazeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgazeService]
    });
  });

  it('should be created', inject([EgazeService], (service: EgazeService) => {
    expect(service).toBeTruthy();
  }));
});
