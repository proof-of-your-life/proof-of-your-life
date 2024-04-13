/* eslint-disable no-irregular-whitespace */
import { Component } from '@angular/core';

@Component({
  selector: 'shared-specified-commercial-transaction-act',
  standalone: true,
  imports: [],
  template: `
    <article class="prose">
      <h1>特定商取引法に基づく表記</h1>
      <h2>販売業者の名称</h2>
      <p>株式会社Ｐｒｏｏｆ　ｏｆ　Ｙｏｕｒ　Ｌｉｆｅ</p>
      <h2>所在地</h2>
      <p>〒150-0043 東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F−C</p>
      <h2>電話番号</h2>
      <p>080-8889-6138 受付時間 10:00-12:00, 14:00-16:00 (土日祝を除く)</p>
      <h2>メールアドレス</h2>
      <p>
        <a
          href="mailto:support@proof-of-your-life.io"
          target="_blank"
          rel="noopener noreferrer"
          >support&#64;proof-of-your-life.io</a
        >
      </p>
      <h2>運営統括責任者</h2>
      <p>松岡靖典</p>
      <h2>追加手数料等の追加料金</h2>
      <ul>
        <li>配送料(一律1,000円/箱)</li>
        <li>手数料(コンビニ決済: 100円)</li>
      </ul>
      <h2>交換および返品（返金ポリシー）</h2>
      <h3>＜お客様都合の返品・交換の場合＞</h3>
      <p>
        発送処理前の商品：ウェブサイトのキャンセルボタンを押すことで注文のキャンセルが可能です。
        発送処理後の商品：未開封の商品は、商品到着後
        10日以内にお客様サポートセンターのメールアドレス (
        <a
          href="mailto:support@proof-of-your-life.io"
          target="_blank"
          rel="noopener noreferrer"
          >support&#64;proof-of-your-life.io</a
        >
        )にメールいただいた場合に限り、
        お客様の送料負担にて返金又は同額以下の商品と交換いたします。開封後の商品は、返品・交換はお受けしておりません。
      </p>
      <h3>＜商品に不備がある場合＞</h3>
      <p>
        当社の送料負担にて返金又は新しい商品と交換いたします。まずはお客様サポートセンターのメールアドレス
        (
        <a
          href="mailto:support@proof-of-your-life.io"
          target="_blank"
          rel="noopener noreferrer"
          >support&#64;proof-of-your-life.io</a
        >
        )までご連絡ください。
      </p>
      <h2>引渡時期</h2>
      <p>
        注文は 3 ～ 5 営業日以内に処理され、商品は 14 日以内に到着します。
        注文後すぐにご利用いただけます。
      </p>
      <h2>受け付け可能な決済手段</h2>
      <p>クレジットカードまたは国内の銀行振込</p>
      <h2>決済期間</h2>
      <p>
        クレジットカード決済の場合はただちに処理されますが、国内の銀行振込の場合は注文から
        3 日以内にお振り込みいただく必要があります。
      </p>
      <h2>販売価格</h2>
      <p>各商品ページに記載の金額</p>
    </article>
  `,
  styles: ``,
})
export class SpecifiedCommercialTransactionActComponent {}
