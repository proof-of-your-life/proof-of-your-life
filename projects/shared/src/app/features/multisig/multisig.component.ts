import { Component, computed, inject, input } from '@angular/core';
import { MultisigService } from './multisig.service';
import { MultisigViewComponent } from './multisig-view.component';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';

@Component({
  selector: 'shared-multisig',
  standalone: true,
  template: `
    <shared-loading-dialog [$isLoading]="$isLoading()" />
    @if ($multisig()) {
      <shared-multisig-view [$multisig]="$multisig()" />
    } @else if ($isLoading()) {
      <div>Loading...</div>
    }
  `,
  styles: ``,
  imports: [MultisigViewComponent, LoadingDialogComponent],
})
export class MultisigComponent {
  private multisigService = inject(MultisigService);

  $userId = input<string | undefined>(undefined);
  $multisig = this.multisigService.$findFirstByUserId(this.$userId);
  $isLoading = computed(() => this.$multisig() === undefined);
}
