import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgazeServicesComponent } from './egaze-services.component';

describe('EgazeServicesComponent', () => {
  let component: EgazeServicesComponent;
  let fixture: ComponentFixture<EgazeServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgazeServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgazeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
