import { Component, inject } from '@angular/core';
import {
  OKTA_AUTH,
  OKTA_CONFIG,
  OktaAuthStateService
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { RouterOutlet } from '@angular/router';
import { oktaConfig } from './okta.config';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf

const oktaAuthClient = new OktaAuth(oktaConfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // ✅ Add CommonModule for *ngIf
  providers: [
    { provide: OKTA_AUTH, useValue: oktaAuthClient },
    { provide: OKTA_CONFIG, useValue: { oktaAuth: oktaAuthClient } },
    OktaAuthStateService
  ],
  template: `
    <h1>Angular + Okta Demo</h1>

    <div *ngIf="isAuthenticated">
      <h2>🎉 Congrats, you're successfully logged in!</h2>
    </div>

    <div *ngIf="!isAuthenticated">
      <button (click)="login()">Login</button>
    </div>

    <button *ngIf="isAuthenticated" (click)="logout()">Logout</button>

    <router-outlet></router-outlet>
  `
})
export class App {
  private oktaAuth = inject<OktaAuth>(OKTA_AUTH);
  private authStateService = inject(OktaAuthStateService);
  isAuthenticated = false;

  ngOnInit() {
    this.authStateService.authState$.subscribe(state => {
      this.isAuthenticated = !!state?.isAuthenticated;
    });
  }

  login() {
    this.oktaAuth.signInWithRedirect();
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
