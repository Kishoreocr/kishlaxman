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
import { EgazeService} from './services/egaze.service';
import {SessionstorageService} from './services/sessionstorage.service';
import { LoadingDivComponent } from './loading-div/loading-div.component';
import { AdminModule } from './admin/admin.module';
import { ModalPropertyComponent } from './modal-property/modal-property.component';
import { ModalPropertyService } from './services/modal-property.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { HelpComponent } from './help/help.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ArticlesComponent } from './articles/articles.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ServicesComponent } from './services/services.component';
import { PropertyMonitoringComponent } from './property-monitoring/property-monitoring.component';
import { AbouteGazeComponent } from './aboute-gaze/aboute-gaze.component';
import { WhyeGazeComponent } from './whye-gaze/whye-gaze.component';
import { BlogsComponent } from './blogs/blogs.component';
import { EgazeServicesComponent } from './egaze-services/egaze-services.component';
import { PackageDescriptionComponent } from './package-description/package-description.component';
import {DataTableModule} from "angular-6-datatable";
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ProfileComponent } from './profile/profile.component';
import { AgentregisterComponent } from './agentregister/agentregister.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'help', component: HelpComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'property-monitoring', component: PropertyMonitoringComponent },
  { path: 'abouteGAZE', component: AbouteGazeComponent },
  { path: 'whyeGAZE', component: WhyeGazeComponent },
  { path: 'blogs', component: BlogsComponent },

  { path: 'egaze-services', component: EgazeServicesComponent },
  { path: 'package-description', component: PackageDescriptionComponent },


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

  { path: 'profile', component: ProfileComponent },
  { path: 'agent-register', component: AgentregisterComponent },

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
    PackageconfirmComponent,
    LoadingDivComponent,
    ModalPropertyComponent,
    AboutusComponent,
    ContactusComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    HelpComponent,
    SitemapComponent,
    ArticlesComponent,
    TestimonialsComponent,
    ServicesComponent,
    PropertyMonitoringComponent,
    AbouteGazeComponent,
    WhyeGazeComponent,
    BlogsComponent,
    EgazeServicesComponent,
    PackageDescriptionComponent,
    ProfileComponent,
    AgentregisterComponent
    
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
    ModalDialogModule.forRoot(),AdminModule,DataTableModule,Ng2TelInputModule
  ],
  exports:[
    LoadingDivComponent

  ],
  providers: [EgazeService,SessionstorageService, ModalPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
