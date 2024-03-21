import { Component, input } from '@angular/core';
import { User } from './user.model';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'shared-user-view',
  standalone: true,
  template: `
    <article class="prose">
      <h1>プロフィール</h1>
      <h2>ユーザーID(公開)</h2>
      <p>{{ $user()?.id }}</p>
      <h2>名前(非公開)</h2>
      <p>{{ $user()?.displayName }}</p>
      <h2>写真(非公開)</h2>
      @if ($user()?.photoUrl) {
        <p>
          <img [src]="$user()?.photoUrl" alt="User's Photo" />
        </p>
      } @else {
        <p>写真は登録されていません。</p>
      }
      <h2>メールアドレス(非公開)</h2>
      <p>{{ $user()?.email }}</p>
      <h2>メール認証(非公開)</h2>
      <p>{{ $user()?.emailVerified ? '認証済' : '未認証' }}</p>
      <h2>電話番号(非公開)</h2>
      <p>{{ $user()?.phoneNumber }}</p>
      <h2>登録日時(公開)</h2>
      <p>
        {{ $user()?.createdAt }}
      </p>
      <h2>更新日時(公開)</h2>
      <p>{{ $user()?.updatedAt }}</p>
    </article>
  `,
  styles: ``,
  imports: [LoadingDialogComponent, DatePipe],
})
export class UserViewComponent {
  $user = input<User | null | undefined>(null);
}
