import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAssignmentComponent } from './property-assignment.component';

describe('PropertyAssignmentComponent', () => {
  let component: PropertyAssignmentComponent;
  let fixture: ComponentFixture<PropertyAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
