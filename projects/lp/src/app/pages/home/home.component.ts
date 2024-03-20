import { Component } from '@angular/core';
import { CompanyHeroComponent } from '@shared/app/ui/company-hero/company-hero.component';
import { KeyImage1HeroComponent } from '@shared/app/ui/key-image-1-hero/key-image-1-hero.component';
import { KeyImage2HeroComponent } from '@shared/app/ui/key-image-2-hero/key-image-2-hero.component';
import { KeyImage3HeroComponent } from '@shared/app/ui/key-image-3-hero/key-image-3-hero.component';
import { LogoMarkHeroComponent } from '@shared/app/ui/logo-mark-hero/logo-mark-hero.component';
import { MembersHeroComponent } from '@shared/app/ui/members-hero/members-hero.component';

@Component({
  selector: 'lp-home',
  standalone: true,
  imports: [
    LogoMarkHeroComponent,
    KeyImage1HeroComponent,
    KeyImage2HeroComponent,
    KeyImage3HeroComponent,
    CompanyHeroComponent,
    MembersHeroComponent,
  ],
  template: `
    <shared-logo-mark-hero />
    <shared-key-image-1-hero />
    <shared-key-image-2-hero />
    <shared-key-image-3-hero />
    <shared-company-hero />
    <shared-members-hero />
  `,
  styles: ``,
})
export class HomeComponent {}
