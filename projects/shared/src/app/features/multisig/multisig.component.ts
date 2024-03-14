import {
  Component,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MultisigService } from './multisig.service';
import { MultisigViewComponent } from './multisig-view.component';
import { Multisig } from './multisig.model';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';

@Component({
  selector: 'shared-multisig',
  standalone: true,
  template: `
    <shared-loading-dialog [$isLoading]="$isLoading" />
    @if ($multisig()) {
      <shared-multisig-view [$multisig]="$multisig" />
    } @else if ($isLoading()) {
      <div>Loading...</div>
    } @else if ($isNotFound()) {
      <div>Not found</div>
    }
  `,
  styles: ``,
  imports: [MultisigViewComponent, LoadingDialogComponent],
})
export class MultisigComponent {
  private multisigService = inject(MultisigService);

  $multisig: WritableSignal<Multisig | null | undefined> = signal(null);
  $isLoading = computed(() => this.$multisig() === null);
  $isNotFound = computed(() => this.$multisig() === undefined);

  constructor() {
    effect(
      () => {
        this.multisigService.getMyMultisig().then((multisig) => {
          this.$multisig.set(multisig);
        });
      },
      { allowSignalWrites: true },
    );
  }
}
