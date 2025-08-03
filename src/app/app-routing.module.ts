import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { NotifyCustomerComponent } from './pages/notify-customer/notify-customer.component';
import { AreaToBeCoveredComponent } from './pages/area-to-be-covered/area-to-be-covered.component';
import { FollowupComponent } from './pages/followup/followup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'add-customer', pathMatch: 'full' },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'view-customer', component: ViewCustomerComponent },
      { path: 'area-covered', component: AreaToBeCoveredComponent },
      { path: 'follow-up', component: FollowupComponent },
      { path: 'notify-customer', component: NotifyCustomerComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
