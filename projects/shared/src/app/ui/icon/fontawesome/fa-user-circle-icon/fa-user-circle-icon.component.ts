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
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-user-circle-icon',
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
export class FaUserCircleIconComponent {
  $iconDefinition: WritableSignal<IconDefinition> | Signal<IconDefinition> =
    signal(faUserCircle);
  @Input() $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
