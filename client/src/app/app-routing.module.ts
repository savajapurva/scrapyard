import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RatecardComponent } from './components/ratecard/ratecard.component';
import { RatecardcalculatorComponent } from './components/ratecardcalculator/ratecardcalculator.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
///////////////////////////
import { VendorportalComponent } from './components/vendorportal/vendorportal.component';
import { VendorregisterComponent } from './components/vendorportal/vendorregister/vendorregister.component';
import { VendorloginComponent } from './components/vendorportal/vendorlogin/vendorlogin.component';
import { VendorprofileComponent } from './components/vendorportal/vendorprofile/vendorprofile.component'
import { VendordashboardComponent } from './components/vendorportal/vendordashboard/vendordashboard.component';
import { VendorauthGuard } from './guards/vendorauth.guard';
//////////////////////////
import { PersonalComponent } from './components/personal/personal.component';
import { AddressComponent } from './components/address/address.component';
import { WorkComponent } from './components/work/work.component';
import { ResultComponent } from './components/result/result.component';

import { WorkflowGuard }        from './workflow/workflow-guard.service';
import { WorkflowService }      from './workflow/workflow.service';
//////////////////////////
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import {AuthGuardService} from './services/auth-guard.service';
import {VendorAuthGuardService} from './services/vendor-auth-guard.service';

import {AcceptedOrdersComponent} from './components/vendorportal/vendordashboard/accepted-orders/accepted-orders.component';
import {AllOrdersDetailsComponent} from './components/vendorportal/vendordashboard/all-orders-details/all-orders-details.component';
import { VendorforgotpasswordComponent } from './components/vendorportal/vendorforgotpassword/vendorforgotpassword.component';

//Ratecard

import { ProductListComponent, ProductAddEditComponent } from './products/index';



// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent // Default Route
  },
  {
    path: 'personal',
    component: PersonalComponent, // Personal Route
    canActivate: [WorkflowGuard,AuthGuardService]
  },
  {
    path: 'address',
    component: AddressComponent, // Personal Route
    canActivate: [WorkflowGuard,AuthGuardService]
  },
  {
    path: 'work',
    component: WorkComponent, // Personal Route
    canActivate: [WorkflowGuard,AuthGuardService],

  },
  {
    path: 'result',
    component: ResultComponent, // Personal Route
    canActivate: [WorkflowGuard,AuthGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    //canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    //canActivate: [NotAuthGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent, // Login Route
    //canActivate: [NotAuthGuard]
  },
  {
    path: 'forgotvendorpassword',
    component: VendorforgotpasswordComponent, // Login Route
    //canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService] // Profile Route

  },
  {
    path: 'vendorprofile',
    component: VendorprofileComponent,
    canActivate: [VendorAuthGuardService] // Profile Route

  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuardService] // Dashboard Route

  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent, // Dashboard Route
  canActivate: [AuthGuardService]
  },
  {
    path: 'delete-blog/:id',
    component: DeleteBlogComponent, // Delete Blog Route
  canActivate: [AuthGuardService]
  },
  {
    path: 'user/:username',
    component: PublicProfileComponent, // Public Profile Route
    canActivate: [AuthGuardService]
  },
  {
    path: 'vendorportal',
    component: VendorportalComponent // Default Route
  },
  {
    path: 'vendorregister',
    component: VendorregisterComponent, // Register Route
    //canActivate: [NotAuthGuard]
  },
  {
    path: 'vendorlogin',
    component: VendorloginComponent, // VendorLogin Route
    //canActivate: [NotAuthGuard]
  },
  {
    path: 'vendordashboard',
    component: VendordashboardComponent, // Vendor Dashboard Route
      children: [
        {
          path: 'allorders',
          component: AllOrdersDetailsComponent,
          canActivate: [VendorAuthGuardService]
        },
        {
          path: 'acceptedorder',
          component: AcceptedOrdersComponent,
          canActivate: [VendorAuthGuardService]
        }
      ],
  canActivate: [VendorAuthGuardService]
  },
  {
    path: 'ratecard',
    component: RatecardComponent, // Ratecard  Route
  },
  {
    path: 'ratecardcalculator',
    component: RatecardcalculatorComponent, // Ratecard  Route
  },
  {
    path: 'contactus',
    component: ContactusComponent, // Ratecard  Route
  },
  {
    path: 'contactus',
    component: ContactusComponent, // Ratecard  Route
  },
  {
      path: 'products',
      component: ProductListComponent,
      children: [
          { path: 'add', component: ProductAddEditComponent, canActivate: [VendorAuthGuardService] },
          { path: 'edit/:id', component: ProductAddEditComponent, canActivate: [VendorAuthGuardService] }
      ],
      canActivate: [VendorAuthGuardService]

    },


  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [WorkflowGuard,VendorauthGuard],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
