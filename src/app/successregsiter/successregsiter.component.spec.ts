import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessregsiterComponent } from './successregsiter.component';

describe('SuccessregsiterComponent', () => {
  let component: SuccessregsiterComponent;
  let fixture: ComponentFixture<SuccessregsiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessregsiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessregsiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
