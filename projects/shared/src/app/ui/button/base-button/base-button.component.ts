import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-base-button',
  standalone: true,
  imports: [],
  template: `
    <button [class]="$isUpperCase() ? '' : 'normal-case'">{{ $text() }}</button>
  `,
  styles: ``,
})
export class BaseButtonComponent {
  $text = input('Button Text');
  $isUpperCase = input(false);
}
