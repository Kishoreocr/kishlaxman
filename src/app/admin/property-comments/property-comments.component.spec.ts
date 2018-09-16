import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCommentsComponent } from './property-comments.component';

describe('PropertyCommentsComponent', () => {
  let component: PropertyCommentsComponent;
  let fixture: ComponentFixture<PropertyCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
