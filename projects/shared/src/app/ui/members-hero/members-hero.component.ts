import { Component } from '@angular/core';
import {
  Member,
  MemberComponent,
} from '@shared/app/ui/member/member.component';

@Component({
  selector: 'shared-members-hero',
  standalone: true,
  imports: [MemberComponent],
  template: `
    <div class="hero">
      <div class="text-center">
        <h2 class="text-5xl font-bold mb-3">メンバー</h2>
        <div class="flex flex-row flex-wrap gap-3 justify-center">
          @for (member of members; track $index) {
            <shared-member [member]="member" />
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MembersHeroComponent {
  members: Member[] = [
    {
      name: '松岡 靖典 / Yasunori Matsuoka',
      image: '/assets/img/member-1.jpg',
      position: '代表取締役 / CEO',
      role: 'Engineer',
      career:
        'ものづくりの会社→(旧: LCNEM=旧: CauchyE=)インターオペラビリティラボ→NPO法人NEMTUS',
      twitter: 'https://twitter.com/salaryman_tousi',
      facebook: 'https://www.facebook.com/yasunori.matsuoka.374',
      github: 'https://github.com/YasunoriMATSUOKA',
    },
    {
      name: '飯田 友広 / Tomohiro Iida',
      image: '/assets/img/member-2.webp',
      position: '取締役 / COO',
      role: 'Business Development',
      career: '警視庁 → 喫茶店 → システム開発会社',
      twitter: 'https://twitter.com/coffee_to_hon',
      facebook: 'https://www.facebook.com/asagiman/',
      github: 'https://github.com/suirindo',
    },
    {
      name: '星川 健太 / Kenta Hoshikawa',
      image: '/assets/img/member-3.webp',
      position: '取締役 / CTO',
      role: 'Engineer',
      career: 'ネットワークエンジニア（8年）→ 整体師（6年）',
      twitter: 'https://twitter.com/hossiiii1',
      facebook: 'https://www.facebook.com/imananninja',
      github: 'https://github.com/hossiiii',
    },
  ];
}
