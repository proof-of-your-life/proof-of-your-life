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
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-plus-icon',
  standalone: true,
  template: `
    <shared-base-fa-icon [$iconDefinition]="$iconDefinition" [$size]="$size" />
  `,
  styles: ``,
  imports: [CommonModule, FontAwesomeModule, BaseFaIconComponent],
})
export class FaPlusIconComponent {
  $iconDefinition: WritableSignal<IconDefinition> | Signal<IconDefinition> =
    signal(faPlus);
  @Input() $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
