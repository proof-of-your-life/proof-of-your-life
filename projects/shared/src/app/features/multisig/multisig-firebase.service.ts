import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDocs } from '@angular/fire/firestore';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { converter } from '@shared/app/utils/firebase/firestore';
import { Multisig } from './multisig.model';
import { IMultisigService } from './multisig.service';

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

  getMyMultisig = async () => {
    const authUser = this.authService.$authUser();
    if (!authUser) {
      console.error(Error('Unauthorized'));
      return undefined;
    }
    const userId = authUser.uid;
    const multisig = (await this.list(userId))[0];
    return multisig;
  };

  list = async (userId: string) => {
    return (await getDocs(this.collectionRef(userId))).docs.map((doc) =>
      doc.data(),
    );
  };
}
