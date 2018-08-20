import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagemodalpopupComponent } from './messagemodalpopup.component';

describe('MessagemodalpopupComponent', () => {
  let component: MessagemodalpopupComponent;
  let fixture: ComponentFixture<MessagemodalpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagemodalpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagemodalpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
