import { Component, input } from '@angular/core';
import { MultisigComponent } from '@shared/app/features/multisig/multisig.component';
import { UserComponent as SharedUserComponent } from '@shared/app/features/user/user.component';

@Component({
  selector: 'web-user',
  standalone: true,
  template: `
    <shared-user [$id]="id()" />
    <div class="mt-12">
      <shared-multisig [$userId]="id()" />
    </div>
  `,
  styles: ``,
  imports: [SharedUserComponent, MultisigComponent],
})
export class UserComponent {
  id = input<string | undefined>(undefined);
}
