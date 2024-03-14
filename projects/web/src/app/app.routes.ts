import { Routes } from '@angular/router';
import { authGuard } from '@shared/app/features/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: 'auth/sign-in',
    loadComponent: () =>
      import('./pages/auth-sign-in/auth-sign-in.component').then(
        (x) => x.AuthSignInComponent,
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (x) => x.PrivacyPolicyComponent,
      ),
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./pages/terms-of-service/terms-of-service.component').then(
        (x) => x.TermsOfServiceComponent,
      ),
  },
  {
    path: 'auth/sign-out',
    loadComponent: () =>
      import('./pages/auth-sign-out/auth-sign-out.component').then(
        (x) => x.AuthSignOutComponent,
      ),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user/user.component').then((x) => x.UserComponent),
    canActivate: [authGuard],
  },
];
