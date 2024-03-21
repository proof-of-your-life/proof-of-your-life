import { Component, inject, input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { FaGoogeIconComponent } from '@shared/app/ui/icon/fontawesome/fa-googe-icon/fa-googe-icon.component';

@Component({
  selector: 'shared-sign-in-with-google-button',
  standalone: true,
  template: `
    <button class="btn bg-cyan-500 normal-case" (click)="clickHandler()">
      <shared-fa-google-icon [$size]="$size()" />
      Googleログイン
    </button>
  `,
  styles: ``,
  imports: [FaGoogeIconComponent],
})
export class SignInWithGoogleButtonComponent {
  private auth = inject(AuthService);

  $size = input<SizeProp>('1x');

  async clickHandler() {
    await this.auth.signInWithGoogle();
  }
}
