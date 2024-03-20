import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Multisig } from './multisig.model';
import { LoadingDialogComponent } from '@shared/app/ui/dialog/loading-dialog/loading-dialog.component';

@Component({
  selector: 'shared-multisig-view',
  standalone: true,
  template: `
    <article class="prose">
      <h1>Symbolブロックチェーン</h1>
      <h2>マルチシグアカウント(公開)</h2>
      @if ($multisig()?.address) {
        <p>
          <a
            class="break-all"
            [href]="
              'https://testnet.symbol.fyi/accounts/' +
              ($multisig()?.address ?? '')
            "
            target="_blank"
            rel="noopener noreferrer"
            >{{ $multisig()?.address }}</a
          >
        </p>
      }
      <p>
        上記ブロックエクスプローラーのリンクからメタデータやアカウント制限やマルチシグ構成やトランザクション情報などご参照ください。
      </p>
      <ul>
        <li>
          データ保管用に新規ログイン時にSymbolブロックチェーンアカウントを自動的に作成し、アカウントメタデータとしてユーザーIDを連携しています。
        </li>
        <li>
          アカウント制限機能を用いて、取引可能なアカウントを制限することで、非金融的なデータ保管用途のみに利用制限し、柔軟なアカウント管理を可能としています。
        </li>
        <li>
          マルチシグアカウントを自動生成しており、将来的にユーザー自己管理アカウントへのスムーズに移行できる技術的可能性を残しています。
        </li>
        <li>
          手数料はすべてサービス運営側でアグリゲートトランザクションの機能を用いて負担しており、お客様にて手数料を負担して頂く必要はありません。
        </li>
      </ul>
    </article>
  `,
  styles: ``,
  imports: [LoadingDialogComponent],
})
export class MultisigViewComponent {
  @Input() $multisig: WritableSignal<Multisig | null | undefined> =
    signal(null);
}
