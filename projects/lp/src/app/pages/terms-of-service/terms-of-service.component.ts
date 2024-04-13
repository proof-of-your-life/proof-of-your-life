import { Component } from '@angular/core';
import { TermsOfServiceComponent as SharedTermsOfService } from '@shared/app/ui/terms-of-service/terms-of-service.component';

@Component({
  selector: 'lp-terms-of-service',
  standalone: true,
  imports: [SharedTermsOfService],
  template: ` <shared-terms-of-service /> `,
  styles: ``,
})
export class TermsOfServiceComponent {}
