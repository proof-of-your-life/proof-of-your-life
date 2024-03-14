import {
  Component,
  Input,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { AvatarWithTooltipComponent } from '@shared/app/ui/avatar-with-tooltip/avatar-with-tooltip.component';
import { FaRightToBracketIconComponent } from '@shared/app/ui/icon/fontawesome/fa-right-to-bracket-icon/fa-right-to-bracket-icon.component';
import { FaRightFromBracketIconComponent } from '@shared/app/ui/icon/fontawesome/fa-right-from-bracket-icon/fa-right-from-bracket-icon.component';

@Component({
  selector: 'shared-avatar-menu',
  standalone: true,
  template: `
    <div class="dropdown dropdown-end">
      <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
      <label [tabIndex]="0" class="btn btn-circle">
        <shared-avatar-with-tooltip
          [$displayName]="$displayName"
          [$photoUrl]="$photoUrl"
        />
      </label>
      <ul
        [tabIndex]="0"
        class="dropdown-content z-[1] menu shadow bg-base-200 rounded-box w-56"
      >
        @if ($userId()) {
          <li>
            <a [routerLink]="['/auth/sign-out']" (click)="close()">
              <shared-fa-right-from-bracket-icon [$size]="$iconSize" />
              <span>ログアウト</span>
            </a>
          </li>
        } @else {
          <li>
            <a [routerLink]="['/auth/sign-in']" (click)="close()">
              <shared-fa-right-to-bracket-icon [$size]="$iconSize" />
              <span>ログイン</span>
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``,
  imports: [
    AvatarWithTooltipComponent,
    RouterLink,
    FaRightToBracketIconComponent,
    FaRightFromBracketIconComponent,
  ],
})
export class AvatarMenuComponent {
  @Input() $userId: WritableSignal<string> | Signal<string> = signal('');
  @Input() $displayName: WritableSignal<string> | Signal<string> = signal('');
  @Input() $photoUrl: WritableSignal<string> | Signal<string> = signal('');

  $iconSize: WritableSignal<SizeProp> = signal('1x');

  close = (): void => {
    const activeElement = document.activeElement;
    if (activeElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (activeElement as any).blur();
    }
  };
}
