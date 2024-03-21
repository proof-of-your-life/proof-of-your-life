import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '@web/environments/environment';
import { AvatarComponent } from '@shared/app/ui/avatar/avatar.component';
import { AvatarWithTooltipComponent } from '@shared/app/ui/avatar-with-tooltip/avatar-with-tooltip.component';
import { AvatarMenuComponent } from '@shared/app/ui/avatar-menu/avatar-menu.component';
import { BaseDialogComponent } from '@shared/app/ui/dialog/base-dialog/base-dialog.component';
import { ErrorDialogComponent } from '@shared/app/ui/dialog/error-dialog/error-dialog.component';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';
import { NavBarComponent } from '@shared/app/ui/nav-bar/nav-bar.component';
import { DrawerComponent } from '@shared/app/ui/drawer/drawer.component';
import { AuthService } from '@shared/app/features/auth/auth.service';

@Component({
  selector: 'web-root',
  standalone: true,
  template: `
    <shared-drawer
      [$title]="$title()"
      [$userId]="$userId()"
      [$displayName]="$displayName()"
      [$photoUrl]="$photoUrl()"
    >
      <router-outlet></router-outlet>
    </shared-drawer>
    <shared-error-dialog
      [$error]="$error()"
      (errorDialogClickCloseButtonEvent)="resetError()"
      (errorDialogClickLeftButtonEvent)="resetError()"
      (errorDialogClickCenterButtonEvent)="resetError()"
      (errorDialogClickRightButtonEvent)="resetError()"
    />
    <shared-loading-dialog [$isLoading]="$isLoading()" />
  `,
  styles: [],
  imports: [
    CommonModule,
    RouterOutlet,
    AvatarComponent,
    AvatarWithTooltipComponent,
    AvatarMenuComponent,
    BaseDialogComponent,
    ErrorDialogComponent,
    LoadingDialogComponent,
    NavBarComponent,
    DrawerComponent,
  ],
})
export class AppComponent {
  private auth = inject(AuthService);

  $authUser = this.auth.$authUser;
  $error = signal<Error | undefined>(undefined);
  $isLoading = signal(false);
  $title = signal(
    `Proof of Your Life${
      environment.environment === 'prod'
        ? ''
        : ' (' + environment.environment + ')'
    }`,
  );
  $userId = computed(() => this.$authUser()?.uid ?? '');
  $displayName = computed(() => this.$authUser()?.displayName ?? '');
  $photoUrl = computed(() => this.$authUser()?.photoURL ?? '');

  resetError(): void {
    this.$error.set(undefined);
  }
}
