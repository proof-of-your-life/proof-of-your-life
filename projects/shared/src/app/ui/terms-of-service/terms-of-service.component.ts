import { Component } from '@angular/core';

@Component({
  selector: 'shared-terms-of-service',
  standalone: true,
  imports: [],
  template: `
    <article class="prose">
      <h1>利用規約</h1>
      <p>
        本サービスは現在ハッカソンイベント向けに開発中の実験的なものであり、ご利用には一定のリスクが伴うことをご理解ください。
      </p>
      <h2>1. 利用規約の適用</h2>
      <p>
        本規約は、本サービスの利用に関する条件を定めるものです。本サービスを利用される場合には、本規約に同意していただく必要があります。
      </p>
      <h2>2. 利用者の責任</h2>
      <p>
        利用者は、本サービスの利用にあたり、全ての責任を負うものとします。利用者は、本サービスを利用するにあたり、全てのリスクを自己の責任において負うものとします。
      </p>
      <h2>3. 禁止事項</h2>
      <p>
        利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。
      </p>
      <ul>
        <li>法令または公序良俗に違反する行為</li>
        <li>本サービスの運営を妨害する行為</li>
        <li>その他、本サービスの利用にあたり、当方が不適切と判断する行為</li>
      </ul>
      <h2>4. 免責事項</h2>
      <p>
        当方は、本サービスに関連して利用者に生じた損害について、一切の責任を負わないものとします。
      </p>
      <h2>5. 本規約の変更</h2>
      <p>
        当方は、本規約を変更することがあります。変更した場合には、本ページにてお知らせいたします。
      </p>
      <h2>6. お問い合わせ先</h2>
      <p>
        本規約に関するお問い合わせは、下記までご連絡ください。
        <br />
        Eメールアドレス:
        <a
          href="mailto:contact@proof-of-your-life.io"
          target="_blank"
          rel="noopener noreferrer"
          >contact&#64;proof-of-your-life.io</a
        >
      </p>
    </article>
  `,
  styles: ``,
})
export class TermsOfServiceComponent {}
