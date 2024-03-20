import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-list-icon',
  standalone: true,
  template: `
    <shared-base-fa-icon [$iconDefinition]="$iconDefinition" [$size]="$size" />
  `,
  styles: ``,
  imports: [CommonModule, FontAwesomeModule, BaseFaIconComponent],
})
export class FaListIconComponent {
  $iconDefinition: WritableSignal<IconDefinition> | Signal<IconDefinition> =
    signal(faList);
  $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
