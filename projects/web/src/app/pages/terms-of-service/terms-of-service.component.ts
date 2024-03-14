import { Component } from '@angular/core';
import { TermsOfServiceComponent as SharedTermsOfServiceComponent } from '@shared/app/ui/terms-of-service/terms-of-service.component';

@Component({
  selector: 'web-terms-of-service',
  standalone: true,
  imports: [SharedTermsOfServiceComponent],
  template: `<shared-terms-of-service />`,
  styles: ``,
})
export class TermsOfServiceComponent {}
