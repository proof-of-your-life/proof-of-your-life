import {
  Component,
  Input,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { AvatarComponent } from '@shared/app/ui/avatar/avatar.component';

@Component({
  selector: 'shared-avatar-with-tooltip',
  standalone: true,
  template: `
    @if ($displayName()) {
      <div class="tooltip tooltip-left" [attr.data-tip]="$displayName()">
        <shared-avatar [$photoUrl]="$photoUrl" [$size]="$size" />
      </div>
    } @else {
      <shared-avatar [$photoUrl]="$photoUrl" [$size]="$size" />
    }
  `,
  styles: ``,
  imports: [AvatarComponent],
})
export class AvatarWithTooltipComponent {
  @Input() $displayName: WritableSignal<string> | Signal<string> = signal('');
  @Input() $photoUrl: WritableSignal<string> | Signal<string> = signal('');
  @Input() $size: WritableSignal<SizeProp> = signal('3x');
}
