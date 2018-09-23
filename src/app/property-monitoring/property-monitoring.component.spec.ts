import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyMonitoringComponent } from './property-monitoring.component';

describe('PropertyMonitoringComponent', () => {
  let component: PropertyMonitoringComponent;
  let fixture: ComponentFixture<PropertyMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
