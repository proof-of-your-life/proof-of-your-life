import { Injectable, inject } from '@angular/core';
import { Multisig } from './multisig.model';
import { MultisigFirebaseService } from './multisig-firebase.service';

export interface IMultisigService {
  getMyMultisig: () => Promise<Multisig | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class MultisigService {
  private iMultisigService: IMultisigService = inject(MultisigFirebaseService);

  getMyMultisig = this.iMultisigService.getMyMultisig;
}
