import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-right-to-bracket-icon',
  standalone: true,
  template: `
    <shared-base-fa-icon
      [$iconDefinition]="$iconDefinition()"
      [$size]="$size()"
    ></shared-base-fa-icon>
  `,
  styles: ``,
  imports: [CommonModule, FontAwesomeModule, BaseFaIconComponent],
})
export class FaRightToBracketIconComponent {
  $iconDefinition = input<IconDefinition>(faRightToBracket);
  $size = input<SizeProp>('3x');
}
