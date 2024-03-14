import { Component, Input, computed } from '@angular/core';
import { MultisigComponent } from '@shared/app/features/multisig/multisig.component';
import { UserComponent as SharedUserComponent } from '@shared/app/features/user/user.component';

@Component({
  selector: 'web-user',
  standalone: true,
  template: `
    @if (id) {
      <shared-user [$id]="$id" />
      <div class="mt-12">
        <shared-multisig />
      </div>
    }
  `,
  styles: ``,
  imports: [SharedUserComponent, MultisigComponent],
})
export class UserComponent {
  @Input() id: string | null | undefined = null;
  $id = computed(() => this.id);
}
