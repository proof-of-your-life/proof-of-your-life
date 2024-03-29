import { Component } from '@angular/core';

@Component({
  selector: 'shared-privacy-policy',
  standalone: true,
  imports: [],
  template: `
    <article class="prose">
      <h1>プライバシーポリシー</h1>
      <p>
        本サービスは現在ハッカソンイベント向けに開発中の実験的なものであり、ご利用には一定のリスクが伴うことをご理解ください。
      </p>
      <h2>1. 個人情報の利用目的</h2>
      <p>
        当サイトでは、お問い合わせ、およびその他のサービスをご利用いただく際に、お名前、メールアドレス、その他の個人情報をご登録いただく場合がございます。これらの個人情報は、お問い合わせに対する回答や必要な情報をご連絡するために利用いたします。
      </p>
      <h2>2. 個人情報の第三者提供</h2>
      <p>
        当サイトでは、個人情報を適切に管理し、以下に該当する場合を除いて第三者に提供することはありません。ただし、本サービスにおける情報の耐改ざん性を確保するためにブロックチェーンを活用している部分においては、原理的に公開済の情報の履歴を削除することが不可能な場合があります。
      </p>
      <ul>
        <li>
          本人のご了解がある場合(明示的に公開の設定をしていただいた場合のみ公開)
        </li>
        <li>法令等への協力のため、提供が必要となる場合</li>
      </ul>
      <h2>3. 個人情報の開示</h2>
      <p>
        当サイトでは、ご登録いただいた個人情報の開示、訂正、追加、削除、利用停止、消去について、ご本人からのご請求に応じることとします。ただし、本サービスにおける情報の耐改ざん性を確保するためにブロックチェーンを活用している部分においては、原理的に公開済の情報の履歴を削除することが不可能な場合があります。
      </p>
      <h2>4. 個人情報の取扱いに関する変更</h2>
      <p>
        当サイトは、個人情報の取扱いに関する方針を変更する場合があります。変更した場合には、本ページにてお知らせいたします。
      </p>
      <h2>5. お問い合わせ先</h2>
      <p>
        個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
        <br />
        Eメールアドレス:
        <a
          href="mailto:privacy@proof-of-your-life.io"
          target="_blank"
          rel="noopener noreferrer"
          >privacy&#64;proof-of-your-life.io</a
        >
      </p>
    </article>
  `,
  styles: ``,
})
export class PrivacyPolicyComponent {}
