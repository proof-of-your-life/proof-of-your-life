import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
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
  @Input() $modalId: WritableSignal<string> | Signal<string> =
    signal('modalId');
  @Input() $isBackDrop: WritableSignal<boolean> | Signal<boolean> =
    signal(false);
  @Input() $isOpen: WritableSignal<boolean> | Signal<boolean> = signal(false);
  @Input() $isLoading: WritableSignal<boolean> | Signal<boolean> =
    signal(false);
  @Input() $title: WritableSignal<string> | Signal<string> =
    signal('Modal Title');
  @Input() $message: WritableSignal<string> | Signal<string> =
    signal('Modal Message');

  @Input() $showCloseButton: WritableSignal<boolean> | Signal<boolean> =
    signal(true);
  @Input() $closeButtonLabel: WritableSignal<string> | Signal<string> =
    signal('X');

  @Input() $showLeftButton: WritableSignal<boolean> | Signal<boolean> =
    signal(true);
  @Input() $leftButtonLabel: WritableSignal<string> | Signal<string> =
    signal('Left Button');

  @Input() $showCenterButton: WritableSignal<boolean> | Signal<boolean> =
    signal(true);
  @Input() $centerButtonLabel: WritableSignal<string> | Signal<string> =
    signal('Center Button');

  @Input() $showRightButton: WritableSignal<boolean> | Signal<boolean> =
    signal(true);
  @Input() $rightButtonLabel: WritableSignal<string> | Signal<string> =
    signal('Right Button');

  @Input() $data: WritableSignal<T> = signal({} as T);

  @Output() baseDialogCloseButtonClickEvent = new EventEmitter<T>();
  @Output() baseDialogLeftButtonClickEvent = new EventEmitter<T>();
  @Output() baseDialogCenterButtonClickEvent = new EventEmitter<T>();
  @Output() baseDialogRightButtonClickEvent = new EventEmitter<T>();

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
