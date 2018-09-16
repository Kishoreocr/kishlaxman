import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalFeedbackComponent } from './portal-feedback.component';

describe('PortalFeedbackComponent', () => {
  let component: PortalFeedbackComponent;
  let fixture: ComponentFixture<PortalFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
