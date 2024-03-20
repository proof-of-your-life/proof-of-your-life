import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { BaseDialogComponent } from '@shared/app/ui/dialog/base-dialog/base-dialog.component';

@Component({
  selector: 'shared-loading-dialog',
  standalone: true,
  template: `
    <shared-base-dialog
      [$isLoading]="$isLoading"
      [$title]="$title"
      [$message]="$message"
      [$isOpen]="$isOpen"
      [$showCloseButton]="$showCloseButton"
      [$showLeftButton]="$showLeftButton"
      [$showCenterButton]="$showCenterButton"
      [$showRightButton]="$showRightButton"
    ></shared-base-dialog>
  `,
  styles: ``,
  imports: [BaseDialogComponent],
})
export class LoadingDialogComponent {
  @Input() $isLoading: WritableSignal<boolean> | Signal<boolean> =
    signal(false);
  @Input() $title: WritableSignal<string> | Signal<string> =
    signal('Loading...');
  @Input() $message: WritableSignal<string> | Signal<string> = signal('');

  $isOpen = computed(() => this.$isLoading());
  $showCloseButton: WritableSignal<boolean> | Signal<boolean> = signal(false);
  $showLeftButton: WritableSignal<boolean> | Signal<boolean> = signal(false);
  $showCenterButton: WritableSignal<boolean> | Signal<boolean> = signal(false);
  $showRightButton: WritableSignal<boolean> | Signal<boolean> = signal(false);
}
