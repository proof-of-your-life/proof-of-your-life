import { Component } from '@angular/core';

@Component({
  selector: 'shared-key-image-1-hero',
  standalone: true,
  imports: [],
  template: `
    <div class="hero">
      <div class="hero-content flex-col lg:flex-row">
        <img
          src="/assets/img/key-image-1.webp"
          class="max-w-80 rounded-lg shadow-2xl"
          alt="Vision of this Service"
        />
        <div>
          <h1 class="text-5xl font-bold">
            みんなで作り、みんなで検証しあう、信頼の数珠つなぎ
          </h1>
          <p class="py-6">
            これまでの証明プラットフォームでは、自分自身が何者であるかの証明を他者に証明してもらう必要がありました。しかし、このプラットフォームでは、自分自身が何者かという情報の確からしさを、参加者同士がお互いの情報の確からしさを相互に検証することで実現することを目指します。
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class KeyImage1HeroComponent {}
