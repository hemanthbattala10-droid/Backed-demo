import { Component, inject } from '@angular/core';
import {
  OKTA_AUTH,
  OKTA_CONFIG,
  OktaAuthStateService
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { RouterOutlet } from '@angular/router';
import { oktaConfig } from './okta.config';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

const oktaAuthClient = new OktaAuth(oktaConfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [
    { provide: OKTA_AUTH, useValue: oktaAuthClient },
    { provide: OKTA_CONFIG, useValue: { oktaAuth: oktaAuthClient } },
    OktaAuthStateService
  ],
  template: `
    <h1>Angular + Okta Demo</h1>

    <div *ngIf="isAuthenticated">
      <h2>🎉 Congrats, you're successfully logged in!</h2>
      <button (click)="callBackend()">Call Backend</button>
      <pre *ngIf="response">{{ response }}</pre>
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
  private http = inject(HttpClient);

  isAuthenticated = false;
  response = '';

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

  async callBackend() {
    try {
      const accessToken = await this.oktaAuth.getAccessToken();

      this.http.get('https://super-guide-x5q75xq7xvrjf677j-3000.app.github.dev/api/protected', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        responseType: 'json'
      }).subscribe({
        next: (res: any) => {
          this.response = `✅ ${res.message}\n\n👤 Token Claims:\n${JSON.stringify(res.user, null, 2)}`;
        },
        error: (err) => {
          this.response = `❌ Error ${err.status}: ${err.message}`;
        }
      });
    } catch (err: any) {
      this.response = '❌ Token error: ' + err.message;
    }
  }
}
