import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-user-plus-icon',
  standalone: true,
  template: `
    <div class="text-center justify-center">
      <shared-base-fa-icon
        [$iconDefinition]="$iconDefinition()"
        [$size]="$size()"
      />
    </div>
  `,
  styles: ``,
  imports: [CommonModule, FontAwesomeModule, BaseFaIconComponent],
})
export class FaUserPlusIconComponent {
  $iconDefinition = input<IconDefinition>(faUserPlus);
  $size = input<SizeProp>('3x');
}
