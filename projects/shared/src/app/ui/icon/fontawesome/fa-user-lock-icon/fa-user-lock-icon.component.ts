import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-user-lock-icon',
  standalone: true,
  template: `
    <div class="text-center justify-center">
      <shared-base-fa-icon
        [$iconDefinition]="$iconDefinition"
        [$size]="$size"
      />
    </div>
  `,
  styles: ``,
  imports: [CommonModule, FontAwesomeModule, BaseFaIconComponent],
})
export class FaUserLockIconComponent {
  $iconDefinition: WritableSignal<IconDefinition> | Signal<IconDefinition> =
    signal(faUserLock);
  @Input() $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
