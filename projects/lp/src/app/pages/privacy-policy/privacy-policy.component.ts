import { Component } from '@angular/core';
import { PrivacyPolicyComponent as SharedPrivacyPolicy } from '@shared/app/ui/privacy-policy/privacy-policy.component';

@Component({
  selector: 'lp-privacy-policy',
  standalone: true,
  imports: [SharedPrivacyPolicy],
  template: ` <shared-privacy-policy /> `,
  styles: ``,
})
export class PrivacyPolicyComponent {}
