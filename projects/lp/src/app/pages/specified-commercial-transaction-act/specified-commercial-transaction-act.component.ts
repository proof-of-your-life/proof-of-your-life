import { Component } from '@angular/core';
import { SpecifiedCommercialTransactionActComponent as SharedSpecifiedCommercialTransactionAct } from '@shared/app/ui/specified-commercial-transaction-act/specified-commercial-transaction-act.component';

@Component({
  selector: 'lp-specified-commercial-transaction-act',
  standalone: true,
  imports: [SharedSpecifiedCommercialTransactionAct],
  template: ` <shared-specified-commercial-transaction-act /> `,
  styles: ``,
})
export class SpecifiedCommercialTransactionActComponent {}
