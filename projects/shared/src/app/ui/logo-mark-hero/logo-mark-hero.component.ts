import { Component } from '@angular/core';

@Component({
  selector: 'shared-logo-mark-hero',
  standalone: true,
  imports: [],
  template: `
    <div class="hero">
      <!-- eslint-disable-next-line @angular-eslint/template/alt-text -->
      <img
        class="w-full object-cover"
        src="/assets/img/logo-mark-horizontal-color.jpg"
        alt="Proof of Your Life Logo Mark"
      />
    </div>
  `,
  styles: ``,
})
export class LogoMarkHeroComponent {}
