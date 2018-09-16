import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentApprovalComponent } from './agent-approval.component';

describe('AgentApprovalComponent', () => {
  let component: AgentApprovalComponent;
  let fixture: ComponentFixture<AgentApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
