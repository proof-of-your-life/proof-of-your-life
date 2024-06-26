/* eslint-disable no-irregular-whitespace */
import { Component, input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaMailBulkIconComponent } from '@shared/app/ui/icon/fontawesome/fa-mail-bulk-icon/fa-mail-bulk-icon.component';
import { FaTwitterIconComponent } from '@shared/app/ui/icon/fontawesome/fa-twitter-icon/fa-twitter-icon.component';
import { FaGithubIconComponent } from '@shared/app/ui/icon/fontawesome/fa-github-icon/fa-github-icon.component';
import { FaHomeIconComponent } from '@shared/app/ui/icon/fontawesome/fa-home-icon/fa-home-icon.component';
import { FaFileContractIconComponent } from '@shared/app/ui/icon/fontawesome/fa-file-contract-icon/fa-file-contract-icon.component';

@Component({
  selector: 'shared-company-hero',
  standalone: true,
  imports: [
    FaMailBulkIconComponent,
    FaTwitterIconComponent,
    FaGithubIconComponent,
    FaHomeIconComponent,
    FaFileContractIconComponent,
  ],
  template: `
    <div class="hero">
      <div class="hero-content text-center flex flex-col">
        <h2 class="text-5xl font-bold">会社概要</h2>
        <div class="overflow-x-auto">
          <table class="table">
            <tbody>
              <tr>
                <th>会社名</th>
                <td>株式会社Ｐｒｏｏｆ　ｏｆ　Ｙｏｕｒ　Ｌｉｆｅ</td>
              </tr>
              <tr>
                <th>法人番号</th>
                <td>7011001160940</td>
              </tr>
              <tr>
                <th>代表者名</th>
                <td>代表取締役 松岡 靖典</td>
              </tr>
              <tr>
                <th>設立年月日</th>
                <td>2024年3月25日</td>
              </tr>
              <tr>
                <th>資本金</th>
                <td>3万円</td>
              </tr>
              <tr>
                <th>業種</th>
                <td>ソフトウェア</td>
              </tr>
              <tr>
                <th>事業内容</th>
                <td>
                  DIDプラットフォーム Proof of Your Life の開発・運営,
                  その他システム開発, プロジェクトマネジメント, コンサルティング
                </td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>
                  〒150-0043 東京都渋谷区道玄坂1丁目10番8号
                  渋谷道玄坂東急ビル2F−C
                </td>
              </tr>
              <tr>
                <th>電話番号</th>
                <td>+81 80 8889 6138</td>
              </tr>
              <tr>
                <th>お問合せ</th>
                <td>
                  <a
                    href="mailto:contact@proof-of-your-life.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <shared-fa-mail-bulk-icon [$size]="$size()" />
                    <span class="ml-3">contact&#64;proof-of-your-life.io</span>
                  </a>
                </td>
              </tr>
              <tr>
                <th>特定商取引法に基づく表記</th>
                <td>
                  <a
                    href="https://proof-of-your-life.io/specified-commercial-transaction-act"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div class="flex flex-row gap-3">
                      <shared-fa-file-contract-icon [$size]="$size()" />
                      <span class="ml-3">特定商取引法に基づく表記</span>
                    </div>
                  </a>
                </td>
              </tr>
            </tbody>
            <tr>
              <th>関連リンク</th>
              <td>
                <div class="flex flex-row gap-3">
                  <a
                    href="https://twitter.com/proof_of_your_x"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <shared-fa-twitter-icon [$size]="$size()" />
                  </a>
                  <a
                    href="https://github.com/proof-of-your-life/proof-of-your-life"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <shared-fa-github-icon [$size]="$size()" />
                  </a>
                  <a
                    href="https://web.dev.proof-of-your-life.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <shared-fa-home-icon [$size]="$size()" />
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CompanyHeroComponent {
  $size = input<SizeProp>('1x');
}
