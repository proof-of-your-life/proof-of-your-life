import { Injectable, Signal, inject } from '@angular/core';
import { Multisig } from './multisig.model';
import { MultisigFirebaseService } from './multisig-firebase.service';
import { Observable } from 'rxjs';

export interface IMultisigService {
  get: (
    userId: string | null | undefined,
    id: string | null | undefined,
  ) => Promise<Multisig | null | undefined>;
  get$: (
    userId: string | null | undefined,
    id: string | null | undefined,
  ) => Observable<Multisig | null | undefined>;
  $get: (
    $userId: Signal<string | null | undefined>,
    $id: Signal<string | null | undefined>,
  ) => Signal<Multisig | null | undefined>;

  me: () => Promise<Multisig | undefined>;
  me$: () => Observable<Multisig | null | undefined>;
  $me: () => Signal<Multisig | null | undefined>;

  listByUserId: (
    userId: string | null | undefined,
  ) => Promise<Multisig[] | null | undefined>;
  listByUserId$: (
    userId: string | null | undefined,
  ) => Observable<Multisig[] | null | undefined>;
  $listByUserId: (
    $userId: Signal<string | null | undefined>,
  ) => Signal<Multisig[] | null | undefined>;

  findFirstByUserId: (
    userId: string | null | undefined,
  ) => Promise<Multisig | null | undefined>;
  findFirstByUserId$: (
    userId: string | null | undefined,
  ) => Observable<Multisig | null | undefined>;
  $findFirstByUserId: (
    $userId: Signal<string | null | undefined>,
  ) => Signal<Multisig | null | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class MultisigService {
  private iMultisigService: IMultisigService = inject(MultisigFirebaseService);

  get = this.iMultisigService.get;
  get$ = this.iMultisigService.get$;
  $get = this.iMultisigService.$get;

  me = this.iMultisigService.me;
  me$ = this.iMultisigService.me$;
  $me = this.iMultisigService.$me;

  listByUserId = this.iMultisigService.listByUserId;
  listByUserId$ = this.iMultisigService.listByUserId$;
  $listByUserId = this.iMultisigService.$listByUserId;

  findFirstByUserId = this.iMultisigService.findFirstByUserId;
  findFirstByUserId$ = this.iMultisigService.findFirstByUserId$;
  $findFirstByUserId = this.iMultisigService.$findFirstByUserId;
}
