import { Component, Input, computed } from '@angular/core';

@Component({
  selector: 'web-user-accounts',
  standalone: true,
  imports: [],
  template: ` <p>user-accounts works!</p> `,
  styles: ``,
})
export class UserAccountsComponent {
  @Input() userId: string | null | undefined = null;
  @Input() accountId: string | null | undefined = null;

  $userId = computed(() => this.userId);
  $accountId = computed(() => this.accountId);
}
