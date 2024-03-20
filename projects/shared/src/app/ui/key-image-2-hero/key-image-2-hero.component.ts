import { Component } from '@angular/core';

@Component({
  selector: 'shared-key-image-2-hero',
  standalone: true,
  imports: [],
  template: `
    <div class="hero">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img
          src="/assets/img/key-image-2.webp"
          class="max-w-80 rounded-lg shadow-2xl"
          alt="Technology's of Proof of Your Life"
        />
        <div>
          <h1 class="text-5xl font-bold">
            堅牢で改竄不能な人生の記録を永遠に...
          </h1>
          <p class="py-6">
            ブロックチェーンは、その特性上、一度記録された情報を改竄することができません。このプラットフォームでは、その特性を利用し、自分自身の人生の記録を堅牢に、改竄不能に記録することを目指します。
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class KeyImage2HeroComponent {}
