import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login/callback',
    renderMode: RenderMode.Client // ✅ Let browser handle Okta redirect
  },
  {
    path: 'protected',
    renderMode: RenderMode.Client // ✅ Avoid SSR for auth-guarded route
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
