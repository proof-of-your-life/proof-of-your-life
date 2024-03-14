import { Component } from '@angular/core';

@Component({
  selector: 'shared-logo-hero',
  standalone: true,
  imports: [],
  template: `
    <div class="hero">
      <!-- eslint-disable-next-line @angular-eslint/template/alt-text -->
      <img
        class="lg:hidden"
        src="/assets/img/logo-mark-color.svg"
        width="300"
      />
    </div>
  `,
  styles: ``,
})
export class LogoHeroComponent {}
