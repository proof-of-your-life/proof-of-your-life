import {
  Component,
  Input,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { BaseDialogComponent } from '@shared/app/ui/dialog/base-dialog/base-dialog.component';

@Component({
  selector: 'shared-error-dialog',
  standalone: true,
  imports: [BaseDialogComponent],
  template: ` <shared-base-dialog
    [$isOpen]="$isOpen"
    [$title]="$title"
    [$message]="$message"
    [$isBackDrop]="$isBackDrop"
    (baseDialogCloseButtonClickEvent)="clickCloseButton()"
    (baseDialogLeftButtonClickEvent)="clickLeftButton()"
    (baseDialogCenterButtonClickEvent)="clickCenterButton()"
    (baseDialogRightButtonClickEvent)="clickRightButton()"
  />`,
  styles: ``,
})
export class ErrorDialogComponent {
  @Input() $error: WritableSignal<Error | undefined> = signal(undefined);

  $isOpen = computed(() => Boolean(this.$error()));
  $title = signal('Error');
  $message = computed(() => {
    return `
Error Name: ${this.$error()?.name ?? 'Unknown Error Name'}
Error Message: ${this.$error()?.message ?? 'Unknown Error Message'}
Error Cause: ${this.$error()?.cause ?? 'Unknown Error Cause'}
Error Stack: ${this.$error()?.stack ?? 'Unknown Error Stack'}
    `;
  });
  $isBackDrop = signal(true);

  clearError = () => {
    this.$error.set(undefined);
  };

  clickCloseButton = () => {
    this.clearError();
  };

  clickLeftButton = () => {
    this.clearError();
  };

  clickCenterButton = () => {
    this.clearError();
  };

  clickRightButton = () => {
    this.clearError();
  };
}
