import {
  Component,
  Input,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaUserCircleIconComponent } from '@shared/app/ui/icon/fontawesome/fa-user-circle-icon/fa-user-circle-icon.component';

@Component({
  selector: 'shared-avatar',
  standalone: true,
  imports: [FaUserCircleIconComponent],
  template: `
    @if ($photoUrl()) {
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img src="{{ $photoUrl() }}" alt="avatar image" class="w-12" />
        </div>
      </div>
    } @else {
      <div class="avatar">
        <div class="w-12 rounded-full flex items-center justify-center">
          <shared-fa-user-circle-icon [$size]="$size" />
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class AvatarComponent {
  @Input() $photoUrl: WritableSignal<string> | Signal<string> = signal('');
  @Input() $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
