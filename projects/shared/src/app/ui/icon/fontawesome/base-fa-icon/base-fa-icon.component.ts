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

@Component({
  selector: 'shared-base-fa-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <fa-icon [icon]="$iconDefinition()" [size]="$size()"></fa-icon> `,
  styles: ``,
})
export class BaseFaIconComponent {
  @Input() $iconDefinition:
    | WritableSignal<IconDefinition>
    | Signal<IconDefinition> = signal(faUserCircle);
  @Input() $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
