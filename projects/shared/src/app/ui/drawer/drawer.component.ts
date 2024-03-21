import { Component, input } from '@angular/core';
import { NavBarComponent } from '@shared/app/ui/nav-bar/nav-bar.component';
import { FooterComponent } from '@shared/app/ui/footer/footer.component';
import { NavMenuComponent } from '@shared/app/ui/nav-menu/nav-menu.component';

@Component({
  selector: 'shared-drawer',
  standalone: true,
  template: `
    <div class="drawer lg:drawer-open">
      <input id="app-menu-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex-col min-h-screen">
        <div>
          <shared-nav-bar
            [$title]="$title()"
            [$userId]="$userId()"
            [$displayName]="$displayName()"
            [$photoUrl]="$photoUrl()"
          />
        </div>

        <div class="font-notosans">
          <div class="flex flex-col min-h-screen max-w-5xl mx-auto">
            <div class="mx-3">
              <ng-content></ng-content>
            </div>
          </div>
        </div>

        <shared-footer />
      </div>

      <div class="drawer-side min-h-screen">
        <label for="app-menu-drawer" class="drawer-overlay"></label>
        <shared-nav-menu [$userId]="$userId()" />
      </div>
    </div>
  `,
  styles: ``,
  imports: [NavBarComponent, FooterComponent, NavMenuComponent],
})
export class DrawerComponent {
  $title = input('title');
  $userId = input('');
  $displayName = input('');
  $photoUrl = input('');
}
