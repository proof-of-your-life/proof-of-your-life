import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaBarsIconComponent } from '@shared/app/ui/icon/fontawesome/fa-bars-icon/fa-bars-icon.component';
import { AvatarMenuComponent } from '@shared/app/ui/avatar-menu/avatar-menu.component';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [RouterLink, FaBarsIconComponent, AvatarMenuComponent],
  template: `
    <div class="navbar bg-base-200">
      <div class="navbar-start">
        <div class="dropdown">
          <label
            for="app-menu-drawer"
            class="btn btn-ghost drawer-button lg:hidden"
          >
            <shared-fa-bars-icon [$size]="$size()" />
          </label>
        </div>
      </div>
      <div class="navbar-center">
        <a [routerLink]="['/']" class="btn btn-ghost normal-case text-xl">
          {{ $title() }}
        </a>
      </div>
      <div class="navbar-end">
        <shared-avatar-menu
          [$userId]="$userId()"
          [$photoUrl]="$photoUrl()"
          [$displayName]="$displayName()"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBarComponent {
  $title = input('title');
  $userId = input('userId');
  $photoUrl = input(
    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  );
  $displayName = input('displayName');
  $size = input<SizeProp>('1x');
}
