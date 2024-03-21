import { Component, computed, inject, input } from '@angular/core';
import { UserService } from './user.service';
import { UserViewComponent } from './user-view.component';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';

@Component({
  selector: 'shared-user',
  standalone: true,
  template: `
    <shared-loading-dialog [$isLoading]="$isLoading()" />
    @if ($user()) {
      <shared-user-view [$user]="$user()" />
    } @else if ($isLoading()) {
      <div>Loading...</div>
    }
  `,
  styles: ``,
  imports: [UserViewComponent, LoadingDialogComponent],
})
export class UserComponent {
  private userService = inject(UserService);
  $id = input.required<string | undefined>();
  $user = this.userService.$get(this.$id);
  $isLoading = computed(() => this.$user() === undefined);
}
