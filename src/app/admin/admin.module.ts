import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ModalComponent } from './directives/modal/modal.component';

import { ModalService } from './service/modal.service';

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
  declarations: [LoginComponent, AdmindashboardComponent, ModalComponent],
  providers: [ModalService]

})
export class AdminModule { }
