import { Component, input, output } from '@angular/core';
import { isWritableSignal } from '@shared/app/utils/angular/isWritableSignal';

@Component({
  selector: 'shared-base-dialog',
  standalone: true,
  imports: [],
  template: `
    <dialog
      [id]="$modalId()"
      [class]="$isOpen() ? 'modal modal-open' : 'modal'"
    >
      <div class="modal-box">
        @if ($showCloseButton()) {
          <form method="dialog">
            <button
              class="btn btn-xs btn-circle btn-ghost absolute right-2 top-2"
              (click)="clickCloseButton()"
            >
              {{ $closeButtonLabel() }}
            </button>
          </form>
        }
        <h3 class="font-bold text-lg">{{ $title() }}</h3>
        @if ($isLoading()) {
          <p><span class="loading loading-spinner loading-lg"></span></p>
        }
        <p class="break-words whitespace-pre-wrap">{{ $message() }}</p>
        <div class="modal-action">
          <form method="dialog" [class]="$isBackDrop() ? 'modal-backdrop' : ''">
            @if ($showLeftButton()) {
              <button class="btn mx-1" (click)="clickLeftButton()">
                {{ $leftButtonLabel() }}
              </button>
            }
            @if ($showCenterButton()) {
              <button class="btn mx-1" (click)="clickCenterButton()">
                {{ $centerButtonLabel() }}
              </button>
            }
            @if ($showRightButton()) {
              <button class="btn mx-1" (click)="clickRightButton()">
                {{ $rightButtonLabel() }}
              </button>
            }
          </form>
        </div>
      </div>
    </dialog>
  `,
  styles: ``,
})
export class BaseDialogComponent<T> {
  $modalId = input('modalId');
  $isBackDrop = input(false);
  $isOpen = input(false);
  $isLoading = input(false);
  $title = input('Modal Title');
  $message = input('Modal Message');

  $showCloseButton = input(true);
  $closeButtonLabel = input('X');

  $showLeftButton = input(true);
  $leftButtonLabel = input('Left Button');

  $showCenterButton = input(true);
  $centerButtonLabel = input('Center Button');

  $showRightButton = input(true);
  $rightButtonLabel = input('Right Button');

  $data = input<T>({} as T);

  baseDialogCloseButtonClickEvent = output<T>();
  baseDialogLeftButtonClickEvent = output<T>();
  baseDialogCenterButtonClickEvent = output<T>();
  baseDialogRightButtonClickEvent = output<T>();

  clickCloseButton(): void {
    this.baseDialogCloseButtonClickEvent.emit(this.$data());
    if (isWritableSignal<boolean>(this.$isOpen)) {
      this.$isOpen.set(false);
    }
  }

  clickLeftButton(): void {
    this.baseDialogLeftButtonClickEvent.emit(this.$data());
    if (isWritableSignal<boolean>(this.$isOpen)) {
      this.$isOpen.set(false);
    }
  }

  clickCenterButton(): void {
    this.baseDialogCenterButtonClickEvent.emit(this.$data());
    if (isWritableSignal<boolean>(this.$isOpen)) {
      this.$isOpen.set(false);
    }
  }

  clickRightButton(): void {
    this.baseDialogRightButtonClickEvent.emit(this.$data());
    if (isWritableSignal<boolean>(this.$isOpen)) {
      this.$isOpen.set(false);
    }
  }
}
