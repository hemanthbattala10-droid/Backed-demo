import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuth } from '@okta/okta-auth-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Protected Page</h2>
    <button (click)="callBackend()">Call Backend with Token</button>
    <p *ngIf="response">{{ response }}</p>
  `
})
export class ProtectedComponent {
  private http = inject(HttpClient);
  private oktaAuth = inject(OktaAuth);

  response = '';

  async callBackend() {
    try {
      const accessToken = await this.oktaAuth.getAccessToken();

      this.http.get('http://localhost:3000/api/protected', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        responseType: 'text'
      }).subscribe({
        next: (res) => this.response = res,
        error: (err) => this.response = 'Error: ' + err.message
      });
    } catch (err: any) {
      this.response = 'Token error: ' + err.message;
    }
  }
}
