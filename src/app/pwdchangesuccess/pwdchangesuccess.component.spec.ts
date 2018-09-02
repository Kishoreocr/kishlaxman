import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdchangesuccessComponent } from './pwdchangesuccess.component';

describe('PwdchangesuccessComponent', () => {
  let component: PwdchangesuccessComponent;
  let fixture: ComponentFixture<PwdchangesuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwdchangesuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdchangesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
