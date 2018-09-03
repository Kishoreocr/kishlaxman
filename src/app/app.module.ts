import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

import { ModalDialogModule } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from './messagemodalpopup/messagemodalpopup.component';
import { SuccessregsiterComponent } from './successregsiter/successregsiter.component';
import { PackagesComponent } from './packages/packages.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ViewpropertyComponent } from './viewproperty/viewproperty.component';
import { PwdchangesuccessComponent } from './pwdchangesuccess/pwdchangesuccess.component';
import { PackageconfirmComponent } from './packageconfirm/packageconfirm.component';
import { EgazeService} from './services/egaze.service'


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loginform', component: UserloginComponent },
  { path: 'registerform', component: UserregisterComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'success-register', component: SuccessregsiterComponent },
  { path: 'package-choose', component: PackagesComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },

  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserloginComponent,
    UserregisterComponent,
    PagenotfoundComponent,
    UserdashboardComponent,
    MessagemodalpopupComponent,
    SuccessregsiterComponent,
    PackagesComponent,
    ForgetpasswordComponent,
    ViewpropertyComponent,
    PwdchangesuccessComponent,
    PackageconfirmComponent
  ],
  entryComponents:[
    MessagemodalpopupComponent,
    ForgetpasswordComponent,
    ViewpropertyComponent,
    PackageconfirmComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ModalDialogModule.forRoot()
  ],
  providers: [EgazeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
