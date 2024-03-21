import { Component, computed, inject } from '@angular/core';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { KeyImage1HeroComponent } from '@shared/app/ui/key-image-1-hero/key-image-1-hero.component';
import { KeyImage2HeroComponent } from '@shared/app/ui/key-image-2-hero/key-image-2-hero.component';
import { KeyImage3HeroComponent } from '@shared/app/ui/key-image-3-hero/key-image-3-hero.component';
import { AuthSignInComponent } from '@web/app/pages/auth-sign-in/auth-sign-in.component';

@Component({
  selector: 'web-home',
  standalone: true,
  imports: [
    KeyImage1HeroComponent,
    KeyImage2HeroComponent,
    KeyImage3HeroComponent,
    AuthSignInComponent,
  ],
  template: `
    <div>
      <shared-key-image-1-hero />
      <shared-key-image-2-hero />
      <shared-key-image-3-hero />
      <web-auth-sign-in [class]="$userId() ? 'hidden' : ''" />
      <div role="alert" class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span
          >デバッグが不十分なため動作が不安定な可能性があります。また、現時点で実装済の機能はログイン後、自動生成されたプロフィール情報とSymbolブロックチェーンアカウント情報を閲覧することができるのみです。</span
        >
      </div>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  private auth = inject(AuthService);
  $userId = computed(() => this.auth.$authUser()?.uid);
}
