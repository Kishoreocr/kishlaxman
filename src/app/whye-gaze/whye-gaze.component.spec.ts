import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyeGazeComponent } from './whye-gaze.component';

describe('WhyeGazeComponent', () => {
  let component: WhyeGazeComponent;
  let fixture: ComponentFixture<WhyeGazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyeGazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyeGazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
