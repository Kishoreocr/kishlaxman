import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDivComponent1Component } from './loading-div-component1.component';

describe('LoadingDivComponent1Component', () => {
  let component: LoadingDivComponent1Component;
  let fixture: ComponentFixture<LoadingDivComponent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingDivComponent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDivComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
