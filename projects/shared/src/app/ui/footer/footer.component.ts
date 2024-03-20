import { Component, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaTwitterIconComponent } from '@shared/app/ui/icon/fontawesome/fa-twitter-icon/fa-twitter-icon.component';
import { FaMailBulkIconComponent } from '@shared/app/ui/icon/fontawesome/fa-mail-bulk-icon/fa-mail-bulk-icon.component';
import { FaGithubIconComponent } from '@shared/app/ui/icon/fontawesome/fa-github-icon/fa-github-icon.component';
import { FaHomeIconComponent } from '@shared/app/ui/icon/fontawesome/fa-home-icon/fa-home-icon.component';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'shared-footer',
  standalone: true,
  template: `
    <footer class="footer footer-center text-base-content rounded bg-base-200">
      <aside>
        <div class="grid grid-flow-col gap-6">
          <a
            href="https://twitter.com/proof_of_your_x"
            target="_blank"
            rel="noopener noreferrer"
          >
            <shared-fa-twitter-icon [$size]="$size" />
          </a>
          <a
            href="https://github.com/proof-of-your-life/proof-of-your-life"
            target="_blank"
            rel="noopener noreferrer"
          >
            <shared-fa-github-icon [$size]="$size" />
          </a>
          <a
            href="https://proof-of-your-life.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <shared-fa-home-icon [$size]="$size" />
          </a>
        </div>
        <div>
          Copyright © 2023 - All right reserved by Proof of Your Life inc.
        </div>
      </aside>
    </footer>
  `,
  styles: ``,
  imports: [
    RouterLink,
    FaTwitterIconComponent,
    FaMailBulkIconComponent,
    FaGithubIconComponent,
    FaHomeIconComponent,
  ],
})
export class FooterComponent {
  $size: WritableSignal<SizeProp> = signal('1x');
}
