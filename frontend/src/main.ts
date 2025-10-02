import 'zone.js' ;
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  OKTA_AUTH,
  OKTA_CONFIG,
  OktaCallbackComponent,
  OktaAuthGuard,
  OktaAuthStateService
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaConfig } from './app/okta.config';
import { ProtectedComponent } from './app/protected.component';

const oktaAuthClient = new OktaAuth(oktaConfig);

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'protected', pathMatch: 'full' },
      { path: 'protected', component: ProtectedComponent, canActivate: [OktaAuthGuard] },
      { path: 'login/callback', component: OktaCallbackComponent }
    ]),
    { provide: OKTA_AUTH, useValue: oktaAuthClient },
    { provide: OKTA_CONFIG, useValue: { oktaAuth: oktaAuthClient } },
    OktaAuthStateService // ✅ manually added
  ]
});
