import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  standalone: true,
  template: `
    <h2>Protected Page</h2>
    <p>If you're seeing this, you're authenticated!</p>
  `
})
export class ProtectedComponent {}
