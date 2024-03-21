import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'shared-base-fa-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <fa-icon [icon]="$iconDefinition()" [size]="$size()"></fa-icon> `,
  styles: ``,
})
export class BaseFaIconComponent {
  $iconDefinition = input.required<IconDefinition>();
  $size = input<SizeProp>('3x');
}
