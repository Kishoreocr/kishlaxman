import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbouteGazeComponent } from './aboute-gaze.component';

describe('AbouteGazeComponent', () => {
  let component: AbouteGazeComponent;
  let fixture: ComponentFixture<AbouteGazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbouteGazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbouteGazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
