import { Component } from '@angular/core';

@Component({
  selector: 'shared-key-image-3-hero',
  standalone: true,
  imports: [],
  template: `
    <div class="hero">
      <div class="hero-content flex-col lg:flex-row">
        <img
          src="/assets/img/key-image-3.jpg"
          class="max-w-80 rounded-lg shadow-2xl"
          alt="Vision of this Service"
        />
        <div>
          <h1 class="text-5xl font-bold">
            公的な証明を要求するには不向きだが、既存のSNSよりも一歩踏み込んだ確認をしたい場面での活用を...
          </h1>
          <h2 class="mt-6 text-4xl font-bold">ユースケース</h2>
          <p class="py-6">
            就学、就職、引越、転職やその他にも日々のちょっとした契約や約束事などのやり取りを滑らかに...
          </p>
          <h2 class="text-3xl font-bold">活用情報</h2>
          <p class="py-6">
            SNSアカウント/国籍/居住地/ニックネーム/名前/生年月日/学歴/職歴/資格情報/イベント参加情報などのプロフィール情報を各自のプライバシーレベルに応じて公開できるDIDプラットフォームサービスを目指して開発中。
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class KeyImage3HeroComponent {}
