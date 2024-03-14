import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { UserService } from './user.service';
import { UserViewComponent } from './user-view.component';
import { User } from './user.model';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';

@Component({
  selector: 'shared-user',
  standalone: true,
  template: `
    <shared-loading-dialog [$isLoading]="$isLoading" />
    @if ($user()) {
      <shared-user-view [user]="$user()" />
    } @else if ($isLoading()) {
      <div>Loading...</div>
    } @else if ($isNotFound()) {
      <div>Not found</div>
    }
  `,
  styles: ``,
  imports: [UserViewComponent, LoadingDialogComponent],
})
export class UserComponent {
  private userService = inject(UserService);

  @Input() $id:
    | WritableSignal<string | null | undefined>
    | Signal<string | null | undefined> = signal(null);

  $user: WritableSignal<User | null | undefined> = signal(null);
  $isLoading = computed(() => this.$user() === null);
  $isNotFound = computed(() => this.$user() === undefined);

  constructor() {
    effect(
      () => {
        this.userService.get$(this.$id()).subscribe((user) => {
          this.$user.set(user);
        });
      },
      { allowSignalWrites: true },
    );
  }
}
