import { Component, computed, input } from '@angular/core';
import { BaseDialogComponent } from '@shared/app/ui/dialog/base-dialog/base-dialog.component';

@Component({
  selector: 'shared-loading-dialog',
  standalone: true,
  template: `
    <shared-base-dialog
      [$isLoading]="$isLoading()"
      [$title]="$title()"
      [$message]="$message()"
      [$isOpen]="$isOpen()"
      [$showCloseButton]="$showCloseButton()"
      [$showLeftButton]="$showLeftButton()"
      [$showCenterButton]="$showCenterButton()"
      [$showRightButton]="$showRightButton()"
    ></shared-base-dialog>
  `,
  styles: ``,
  imports: [BaseDialogComponent],
})
export class LoadingDialogComponent {
  $isLoading = input.required<boolean>();
  $title = input('Loading...');
  $message = input('');
  $showCloseButton = input(false);
  $showLeftButton = input(false);
  $showCenterButton = input(false);
  $showRightButton = input(false);

  $isOpen = computed(() => this.$isLoading());
}
