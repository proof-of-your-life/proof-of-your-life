import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '@lp/environments/environment';

@Component({
  selector: 'admin-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <p>Environment: {{ environment.environment }}</p>
    <p>IsEmulator: {{ environment.useEmulator }}</p>
    <p>
      Blockchain Symbol Network: {{ environment.blockchain.symbol.network }}
    </p>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'lp';
  environment = environment;
}
