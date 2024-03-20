import { Component, Input, WritableSignal, signal } from '@angular/core';
import { FaTwitterIconComponent } from '../icon/fontawesome/fa-twitter-icon/fa-twitter-icon.component';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaFacebookIconComponent } from '../icon/fontawesome/fa-facebook-icon/fa-facebook-icon.component';
import { FaGithubIconComponent } from '../icon/fontawesome/fa-github-icon/fa-github-icon.component';

export type Member = {
  name: string;
  image: string;
  position: string;
  role: string;
  career: string;
  twitter: string;
  facebook: string;
  github: string;
};

@Component({
  selector: 'shared-member',
  standalone: true,
  imports: [
    FaTwitterIconComponent,
    FaFacebookIconComponent,
    FaGithubIconComponent,
  ],
  template: `
    @if (member) {
      <div class="max-w-xs">
        <div class="avatar">
          <div class="rounded-full">
            <img
              class="max-w-xs"
              [src]="member.image"
              alt="{{ member.name + ' profile image' }}"
            />
          </div>
        </div>
        <h3>{{ member.name }}</h3>
        <p>{{ member.position }}</p>
        <p>{{ member.role }}</p>
        <p>{{ member.career }}</p>
        <div class="flex flex-row flex-wrap gap-3 justify-center">
          @if (member.twitter) {
            <a [href]="member.twitter">
              <shared-fa-twitter-icon [$size]="$size" />
            </a>
          }
          @if (member.facebook) {
            <a [href]="member.facebook">
              <shared-fa-facebook-icon [$size]="$size" />
            </a>
          }
          @if (member.github) {
            <a [href]="member.github">
              <shared-fa-github-icon [$size]="$size" />
            </a>
          }
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class MemberComponent {
  @Input() member?: Member = undefined;

  $size: WritableSignal<SizeProp> = signal('1x');
}
