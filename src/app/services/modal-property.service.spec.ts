import { TestBed, inject } from '@angular/core/testing';

import { ModalPropertyService } from './modal-property.service';

describe('ModalPropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalPropertyService]
    });
  });

  it('should be created', inject([ModalPropertyService], (service: ModalPropertyService) => {
    expect(service).toBeTruthy();
  }));
});
