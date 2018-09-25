import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ModalComponent } from './directives/modal/modal.component';

import { ModalService } from './service/modal.service';
import { PropertyApprovalComponent } from './property-approval/property-approval.component';
import { AgentApprovalComponent } from './agent-approval/agent-approval.component';
import { PaymentApprovalComponent } from './payment-approval/payment-approval.component';
import { CustomPackagesComponent } from './custom-packages/custom-packages.component';
import { PropertyCommentsComponent } from './property-comments/property-comments.component';
import { PortalFeedbackComponent } from './portal-feedback/portal-feedback.component';
import { LoadingDivComponent1Component } from './loading-div-component1/loading-div-component1.component';

const appRoutes: Routes = [
  { path: 'adminlogin', component: LoginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),

  ],
  declarations: [LoginComponent, AdmindashboardComponent, ModalComponent, PropertyApprovalComponent, AgentApprovalComponent, PaymentApprovalComponent, CustomPackagesComponent, PropertyCommentsComponent, PortalFeedbackComponent, LoadingDivComponent1Component],
  providers: [ModalService]

})
export class AdminModule { }
