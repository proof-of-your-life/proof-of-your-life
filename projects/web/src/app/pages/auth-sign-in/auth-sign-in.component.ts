import { Component, effect, inject } from '@angular/core';
import { SignInWithGoogleButtonComponent } from '@shared/app/ui/button/sign-in-with-google-button/sign-in-with-google-button.component';
import { SignInWithTwitterButtonComponent } from '@shared/app/ui/button/sign-in-with-twitter-button/sign-in-with-twitter-button.component';
import { SignInWithGithubButtonComponent } from '@shared/app/ui/button/sign-in-with-github-button/sign-in-with-github-button.component';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'web-auth-sign-in',
  standalone: true,
  template: `
    <div class="hero lg:min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-xl">
          <h1 class="text-5xl font-bold">
            あなたの人生をここから刻んでいきましょう！
          </h1>
          <p class="py-6">お好みのアカウントでログインして始めましょう！</p>
          <p class="pb-6">
            <a class="link" [routerLink]="['/privacy-policy']"
              >プライバシーポリシー</a
            >
            <a class="ml-3 link" [routerLink]="['/terms-of-service']"
              >利用規約</a
            >
          </p>
          <div class="flex justify-center flex-row flex-wrap gap-3">
            <shared-sign-in-with-google-button />
            <shared-sign-in-with-twitter-button />
            <shared-sign-in-with-github-button />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  imports: [
    SignInWithGoogleButtonComponent,
    SignInWithTwitterButtonComponent,
    SignInWithGithubButtonComponent,
    RouterLink,
  ],
})
export class AuthSignInComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.$authState()) {
        this.router.navigate(['/']);
      }
    });
  }
}
