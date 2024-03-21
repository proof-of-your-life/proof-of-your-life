import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaHomeIconComponent } from '@shared/app/ui/icon/fontawesome/fa-home-icon/fa-home-icon.component';
import { FaUserCircleIconComponent } from '@shared/app/ui/icon/fontawesome/fa-user-circle-icon/fa-user-circle-icon.component';
import { FaRightFromBracketIconComponent } from '@shared/app/ui/icon/fontawesome/fa-right-from-bracket-icon/fa-right-from-bracket-icon.component';
import { FaRightToBracketIconComponent } from '@shared/app/ui/icon/fontawesome/fa-right-to-bracket-icon/fa-right-to-bracket-icon.component';
import { FaUserLockIconComponent } from '@shared/app/ui/icon/fontawesome/fa-user-lock-icon/fa-user-lock-icon.component';
import { FaFileContractIconComponent } from '@shared/app/ui/icon/fontawesome/fa-file-contract-icon/fa-file-contract-icon.component';
import { FaUserPlusIconComponent } from '@shared/app/ui/icon/fontawesome/fa-user-plus-icon/fa-user-plus-icon.component';
import { FaMailBulkIconComponent } from '@shared/app/ui/icon/fontawesome/fa-mail-bulk-icon/fa-mail-bulk-icon.component';
import { FaAddressCardIconComponent } from '@shared/app/ui/icon/fontawesome/fa-address-card-icon/fa-address-card-icon.component';

@Component({
  selector: 'shared-nav-menu',
  standalone: true,
  template: `
    <ul
      class="menu bg-base-200 w-72 box h-full flex flex-col min-h-screen flex-nowrap p-0"
    >
      <li class="siteIcon">
        <a [routerLink]="['/']" class="p-0">
          <img
            src="/assets/img/logo-mark-color.svg"
            alt="Logo Mark of Proof of Your Life"
            width="276"
            height="276"
          />
        </a>
      </li>
      <div class="divider"></div>
      <li>
        <a [routerLink]="['/']" (click)="toggleDrawer()">
          <shared-fa-home-icon [$size]="$size()" />
          <span>ホーム</span>
        </a>
      </li>
      @if ($userId()) {
        <li>
          <a [routerLink]="['/users', $userId()]" (click)="toggleDrawer()">
            <shared-fa-user-circle-icon [$size]="$size()" />
            <span>プロフィール</span>
          </a>
        </li>
        <li>
          <a
            [routerLink]="['/public/profile/', $userId()]"
            (click)="toggleDrawer()"
          >
            <shared-fa-address-card-icon [$size]="$size()" />
            <span>公開プロフィール(開発中)</span>
          </a>
        </li>
        <li>
          <a
            [routerLink]="['/users', $userId(), 'accounts']"
            (click)="toggleDrawer()"
          >
            <shared-fa-user-plus-icon [$size]="$size()" />
            <span>アカウント連携(開発中)</span>
          </a>
        </li>
        <li>
          <a [routerLink]="['/privacy-policy']" (click)="toggleDrawer()">
            <shared-fa-user-lock-icon [$size]="$size()" />
            <span>プライバシーポリシー</span>
          </a>
        </li>
        <li>
          <a [routerLink]="['/terms-of-service']" (click)="toggleDrawer()">
            <shared-fa-file-contract-icon [$size]="$size()" />
            <span>利用規約</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:contact@proof-of-your-life.io"
            target="_blank"
            rel="noopener noreferrer"
            (click)="toggleDrawer()"
          >
            <shared-fa-mail-bulk-icon [$size]="$size()" />
            <span>お問合せ</span>
          </a>
        </li>
        <li>
          <a [routerLink]="['/auth/sign-out']" (click)="toggleDrawer()">
            <shared-fa-right-from-bracket-icon [$size]="$size()" />
            <span>ログアウト</span>
          </a>
        </li>
      } @else {
        <li>
          <a [routerLink]="['/auth/sign-in']" (click)="toggleDrawer()">
            <shared-fa-right-to-bracket-icon [$size]="$size()" />
            <span>ログイン</span>
          </a>
        </li>
        <li>
          <a [routerLink]="['/privacy-policy']" (click)="toggleDrawer()">
            <shared-fa-user-lock-icon [$size]="$size()" />
            <span>プライバシーポリシー</span>
          </a>
        </li>
        <li>
          <a [routerLink]="['/terms-of-service']" (click)="toggleDrawer()">
            <shared-fa-file-contract-icon [$size]="$size()" />
            <span>利用規約</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:contact@proof-of-your-life.io"
            target="_blank"
            rel="noopener noreferrer"
            (click)="toggleDrawer()"
          >
            <shared-fa-mail-bulk-icon [$size]="$size()" />
            <span>お問合せ</span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: ``,
  imports: [
    RouterLink,
    FaHomeIconComponent,
    FaUserCircleIconComponent,
    FaRightToBracketIconComponent,
    FaRightFromBracketIconComponent,
    FaUserLockIconComponent,
    FaFileContractIconComponent,
    FaUserPlusIconComponent,
    FaMailBulkIconComponent,
    FaAddressCardIconComponent,
  ],
})
export class NavMenuComponent {
  $userId = input('');
  $size = input<SizeProp>('1x');

  toggleDrawer() {
    const elem = document.getElementById('app-menu-drawer'); // Note: this is the id of the drawer(outside of this component)
    if (elem) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (elem as any).click();
    }
  }
}
