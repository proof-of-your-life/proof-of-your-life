import { Component, WritableSignal, inject, signal } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { FaTwitterIconComponent } from '@shared/app/ui/icon/fontawesome/fa-twitter-icon/fa-twitter-icon.component';

@Component({
  selector: 'shared-sign-in-with-twitter-button',
  standalone: true,
  template: `
    <button
      class="btn bg-sky-500 normal-case"
      (click)="clickHandler()"
      disabled
    >
      <shared-fa-twitter-icon [$size]="$size" />
      Twitterログイン
    </button>
  `,
  styles: ``,
  imports: [FaTwitterIconComponent],
})
export class SignInWithTwitterButtonComponent {
  private auth = inject(AuthService);

  $size: WritableSignal<SizeProp> = signal('1x');

  async clickHandler() {
    await this.auth.signInWithTwitter();
  }
}
