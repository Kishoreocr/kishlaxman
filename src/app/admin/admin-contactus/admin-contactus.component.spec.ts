import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactusComponent } from './admin-contactus.component';

describe('AdminContactusComponent', () => {
  let component: AdminContactusComponent;
  let fixture: ComponentFixture<AdminContactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
