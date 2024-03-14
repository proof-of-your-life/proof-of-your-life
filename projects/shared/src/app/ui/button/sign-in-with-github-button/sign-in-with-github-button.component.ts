import { Component, WritableSignal, inject, signal } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { FaGithubIconComponent } from '@shared/app/ui/icon/fontawesome/fa-github-icon/fa-github-icon.component';

@Component({
  selector: 'shared-sign-in-with-github-button',
  standalone: true,
  template: `
    <button class="btn normal-case" (click)="clickHandler()" disabled>
      <shared-fa-github-icon [$size]="$size" />
      GitHubログイン
    </button>
  `,
  styles: ``,
  imports: [FaGithubIconComponent],
})
export class SignInWithGithubButtonComponent {
  private auth = inject(AuthService);

  $size: WritableSignal<SizeProp> = signal('1x');

  async clickHandler() {
    await this.auth.signInWithGithub();
  }
}
