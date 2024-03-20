import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/app/features/auth/auth.service';

@Component({
  selector: 'web-auth-sign-out',
  standalone: true,
  imports: [],
  template: ` <div></div> `,
  styles: ``,
})
export class AuthSignOutComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  constructor() {
    this.signOutAndRedirectHome().then();
  }

  async signOutAndRedirectHome() {
    await this.auth.signOut();
    await this.router.navigate(['/']);
  }
}
