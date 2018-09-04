import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'adminlogin', component: LoginComponent },
  
]
@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes, { enableTracing: true }),

  ],
  declarations: [LoginComponent],
  providers: []

})
export class AdminModule { }
