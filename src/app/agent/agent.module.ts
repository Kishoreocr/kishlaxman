import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {RoleAuthenticationService as RoleGuard } from '../services/role-authentication';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';


const appRoutes: Routes = [

  { path: 'agentdashboard', component: AgentdashboardComponent  , canActivate: [RoleGuard], 
  data: { 
      expectedRole: 'agent'
    } }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  declarations: [AgentdashboardComponent],
  providers: [RoleGuard]

})
export class AgentModule { }
