import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { BlogService } from './services/blog.service';
import { vendorAuthService } from './services/vendorauth.service';
import { AuthGuardService } from './services/auth-guard.service';
import {VendorAuthGuardService} from './services/vendor-auth-guard.service';
//Rate Card
import { ProductService, PubSubService } from './_services/index';
import { ProductListComponent, ProductAddEditComponent } from './products/index';
///////////////
/* Shared Service */
import { FormDataService }    from './data/formData.service';
import { WorkflowService }    from './workflow/workflow.service';
/////////////
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
///////////////////
import { PersonalComponent } from './components/personal/personal.component';
import { AddressComponent } from './components/address/address.component';
import { WorkComponent } from './components/work/work.component';
import { ResultComponent } from './components/result/result.component';
import { SecondnavbarComponent } from './components/secondnavbar/secondnavbar.component';
import { VendorportalComponent } from './components/vendorportal/vendorportal.component';
import { VendorloginComponent } from './components/vendorportal/vendorlogin/vendorlogin.component';
import { VendorregisterComponent } from './components/vendorportal/vendorregister/vendorregister.component';
import { VendordashboardComponent } from './components/vendorportal/vendordashboard/vendordashboard.component';
import {MatTableModule} from '@angular/material/table';
import { RatecardComponent } from './components/ratecard/ratecard.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AllOrdersDetailsComponent } from './components/vendorportal/vendordashboard/all-orders-details/all-orders-details.component';
import { AcceptedOrdersComponent } from './components/vendorportal/vendordashboard/accepted-orders/accepted-orders.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { VendorforgotpasswordComponent } from './components/vendorportal/vendorforgotpassword/vendorforgotpassword.component';
import { VendorprofileComponent } from './components/vendorportal/vendorprofile/vendorprofile.component';
import { RatecardcalculatorComponent } from './components/ratecardcalculator/ratecardcalculator.component';

///////////////////

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    PublicProfileComponent,
    DeleteBlogComponent,
    PersonalComponent,
    AddressComponent,
    WorkComponent,
    ResultComponent,
    SecondnavbarComponent,
    VendorportalComponent,
    VendorloginComponent,
    VendorregisterComponent,
    VendordashboardComponent,
    RatecardComponent,
    ContactusComponent,
    AllOrdersDetailsComponent,
    AcceptedOrdersComponent,
    ForgotpasswordComponent,
    VendorforgotpasswordComponent,
    VendorprofileComponent,
    ProductListComponent,
    ProductAddEditComponent,
    RatecardcalculatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule,
    Ng2SmartTableModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCw96SBXZGS-sziHgUvlGuP13b3UceNLrY'
    }),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ProductService,PubSubService,vendorAuthService,VendorAuthGuardService,AuthService,AuthGuardService,OrderService,AuthGuard,NotAuthGuard,BlogService,{ provide: FormDataService, useClass: FormDataService },
              { provide: WorkflowService, useClass: WorkflowService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
