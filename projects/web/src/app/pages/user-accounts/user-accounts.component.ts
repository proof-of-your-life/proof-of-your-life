import { Component, input } from '@angular/core';

@Component({
  selector: 'web-user-accounts',
  standalone: true,
  imports: [],
  template: ` <p>user-accounts works!</p> `,
  styles: ``,
})
export class UserAccountsComponent {
  $userId = input<string | null | undefined>(undefined);
  $accountId = input<string | null | undefined>(undefined);
}
