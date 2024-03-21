import { Injectable, Signal, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { converter } from '@shared/app/utils/firebase/firestore';
import { Multisig } from './multisig.model';
import { IMultisigService } from './multisig.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root',
})
export class MultisigFirebaseService implements IMultisigService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  collectionPath = (userId: string) =>
    `/users/${userId}/blockchains/symbol/multisigs/`;
  collectionRef = (userId: string) =>
    collection(this.firestore, this.collectionPath(userId)).withConverter(
      converter<Multisig>(),
    );

  docPath = (userId: string, id: string) =>
    `${this.collectionPath(userId)}/${id}`;
  docRef = (userId: string, id: string) =>
    doc(this.firestore, this.docPath(userId, id)).withConverter(
      converter<Multisig>(),
    );

  get = async (
    userId: string | null | undefined,
    id: string | null | undefined,
  ) => {
    if (userId === null || id === null) {
      return null;
    } else if (!(userId && id)) {
      return undefined;
    }
    const doc = await getDoc(this.docRef(userId, id));
    if (doc.exists()) {
      return doc.data();
    } else {
      console.error(Error('Multisig Not Found'));
      return undefined;
    }
  };
  get$ = (userId: string | null | undefined, id: string | null | undefined) => {
    if (userId === null || id === null) {
      return of(null);
    } else if (!(userId && id)) {
      return of(undefined);
    }
    return docData(this.docRef(userId, id));
  };
  $get = (
    $userId: Signal<string | null | undefined>,
    $id: Signal<string | null | undefined>,
  ) =>
    toSignal(
      forkJoin([toObservable($userId), toObservable($id)]).pipe(
        mergeMap(([userId, id]) => this.get$(userId, id)),
      ),
    );

  me = async () => {
    const authUser = this.authService.$authUser();
    if (!authUser) {
      console.error(Error('Unauthorized'));
      return undefined;
    }
    const userId = authUser.uid;
    const multisigs = await this.listByUserId(userId);
    if (!multisigs?.length) {
      return undefined;
    }
    return multisigs[0];
  };
  me$ = () => {
    return this.authService.authUser$.pipe(
      mergeMap((authUser) => {
        if (!authUser) {
          return of(authUser);
        }
        return this.listByUserId$(authUser.uid);
      }),
      map((multisigs) => {
        if (multisigs === null) {
          return null;
        } else if (!multisigs?.length) {
          return undefined;
        }
        return multisigs[0];
      }),
    );
  };
  $me = () => toSignal(this.me$());

  listByUserId = async (userId: string | null | undefined) => {
    if (userId === null) {
      return null;
    } else if (!userId) {
      return undefined;
    }
    return (await getDocs(this.collectionRef(userId))).docs.map((doc) =>
      doc.data(),
    );
  };
  listByUserId$ = (
    userId: string | null | undefined,
  ): Observable<Multisig[] | null | undefined> => {
    if (userId === null) {
      console.log({ userId });
      return of(null);
    } else if (!userId) {
      console.log({ userId });
      return of(undefined);
    }
    return collectionData(this.collectionRef(userId)) as Observable<Multisig[]>;
  };
  $listByUserId = ($userId: Signal<string | null | undefined>) =>
    toSignal(
      toObservable($userId).pipe(
        mergeMap((userId) => this.listByUserId$(userId)),
      ),
    );

  findFirstByUserId = async (userId: string | null | undefined) => {
    const multisigs = await this.listByUserId(userId);
    if (multisigs === null) {
      return null;
    } else if (!multisigs?.length) {
      return undefined;
    }
    return multisigs[0];
  };
  findFirstByUserId$ = (userId: string | null | undefined) => {
    return this.listByUserId$(userId).pipe(
      map((multisigs) => {
        if (multisigs === null) {
          return null;
        } else if (!multisigs?.length) {
          return undefined;
        }
        return multisigs[0];
      }),
    );
  };
  $findFirstByUserId = ($userId: Signal<string | null | undefined>) => {
    return toSignal(
      toObservable($userId).pipe(
        mergeMap((userId) => this.findFirstByUserId$(userId)),
      ),
    );
  };
}
