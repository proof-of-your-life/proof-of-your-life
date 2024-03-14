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
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { BaseFaIconComponent } from '@shared/app/ui/icon/fontawesome/base-fa-icon/base-fa-icon.component';

@Component({
  selector: 'shared-fa-github-icon',
  standalone: true,
  template: `
    <shared-base-fa-icon [$iconDefinition]="$iconDefinition" [$size]="$size" />
  `,
  styles: ``,
  imports: [CommonModule, FontAwesomeModule, BaseFaIconComponent],
})
export class FaGithubIconComponent {
  $iconDefinition: WritableSignal<IconDefinition> | Signal<IconDefinition> =
    signal(faGithub);
  @Input() $size: WritableSignal<SizeProp> | Signal<SizeProp> = signal('3x');
}
