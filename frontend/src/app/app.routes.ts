import { Routes } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { HomeComponent } from './home.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // public home page

  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [OktaAuthGuard] // ✅ route guard for authenticated access
  },

  {
    path: 'login/callback',
    component: OktaCallbackComponent // ✅ handles Okta redirect after login
  }
];
