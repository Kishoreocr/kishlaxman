import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageconfirmComponent } from './packageconfirm.component';

describe('PackageconfirmComponent', () => {
  let component: PackageconfirmComponent;
  let fixture: ComponentFixture<PackageconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
