import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // ✅ Enables *ngIf
  template: `
    <h1>Welcome to the Home Page</h1>

    <div *ngIf="isAuthenticated">
      <h2>🎉 Congrats, you're successfully logged in!</h2>
    </div>

    <div *ngIf="!isAuthenticated">
      <button (click)="login()">Login</button>
    </div>
  `
})
export class HomeComponent {
  private authStateService = inject(OktaAuthStateService);
  private oktaAuth = inject<OktaAuth>(OKTA_AUTH);
  isAuthenticated = false;

  ngOnInit(): void {
    this.authStateService.authState$.subscribe(state => {
      this.isAuthenticated = !!state?.isAuthenticated;
    });
  }

  login(): void {
    this.oktaAuth.signInWithRedirect();
  }
}
