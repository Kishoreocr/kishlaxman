import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPackagesComponent } from './custom-packages.component';

describe('CustomPackagesComponent', () => {
  let component: CustomPackagesComponent;
  let fixture: ComponentFixture<CustomPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
