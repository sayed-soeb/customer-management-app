import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Required for ngModel
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { NotifyCustomerComponent } from './pages/notify-customer/notify-customer.component';

import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { AreaToBeCoveredComponent } from './pages/area-to-be-covered/area-to-be-covered.component';
import { FollowupComponent } from './pages/followup/followup.component'; // ✅ Required for <pagination-controls>

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddCustomerComponent,
    ViewCustomerComponent,
    NotifyCustomerComponent,
    AreaToBeCoveredComponent,
    FollowupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // ✅ Add this
    HttpClientModule,
    NgxPaginationModule // ✅ Add this
  ],
  providers: [AuthService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
