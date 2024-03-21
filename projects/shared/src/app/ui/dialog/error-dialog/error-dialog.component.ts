import { Component, computed, input, output } from '@angular/core';
import { BaseDialogComponent } from '@shared/app/ui/dialog/base-dialog/base-dialog.component';

@Component({
  selector: 'shared-error-dialog',
  standalone: true,
  imports: [BaseDialogComponent],
  template: ` <shared-base-dialog
    [$isOpen]="$isOpen()"
    [$title]="$title()"
    [$message]="$message()"
    [$isBackDrop]="$isBackDrop()"
    (baseDialogCloseButtonClickEvent)="clickCloseButton()"
    (baseDialogLeftButtonClickEvent)="clickLeftButton()"
    (baseDialogCenterButtonClickEvent)="clickCenterButton()"
    (baseDialogRightButtonClickEvent)="clickRightButton()"
  />`,
  styles: ``,
})
export class ErrorDialogComponent {
  $error = input<Error | undefined>(undefined);
  $title = input('Error');
  $isBackDrop = input(true);

  $isOpen = computed(() => Boolean(this.$error()));
  $message = computed(() => {
    return `
Error Name: ${this.$error()?.name ?? 'Unknown Error Name'}
Error Message: ${this.$error()?.message ?? 'Unknown Error Message'}
Error Cause: ${this.$error()?.cause ?? 'Unknown Error Cause'}
Error Stack: ${this.$error()?.stack ?? 'Unknown Error Stack'}
    `;
  });

  errorDialogClickCloseButtonEvent = output();
  errorDialogClickLeftButtonEvent = output();
  errorDialogClickCenterButtonEvent = output();
  errorDialogClickRightButtonEvent = output();

  clickCloseButton(): void {
    this.errorDialogClickCloseButtonEvent.emit();
  }

  clickLeftButton(): void {
    this.errorDialogClickLeftButtonEvent.emit();
  }

  clickCenterButton(): void {
    this.errorDialogClickCenterButtonEvent.emit();
  }

  clickRightButton(): void {
    this.errorDialogClickRightButtonEvent.emit();
  }
}
