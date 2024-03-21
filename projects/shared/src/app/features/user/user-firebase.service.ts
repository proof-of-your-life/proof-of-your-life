import { Injectable, Signal, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { AuthService } from '@shared/app/features/auth/auth.service';
import { converter } from '@shared/app/utils/firebase/firestore';
import { NewUser, UpdatableUser, User } from './user.model';
import { ulid } from 'ulid';
import { IUserService } from './user.service';
import { Observable, mergeMap, of } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService implements IUserService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  collectionPath = '/users';
  collectionRef = collection(this.firestore, this.collectionPath).withConverter(
    converter<User>(),
  );

  docPath = (id: string) => `${this.collectionPath}/${id}`;
  docRef = (id: string) =>
    doc(this.firestore, this.docPath(id)).withConverter(converter<User>());

  get = async (id: string | null | undefined) => {
    if (id === null) {
      return null;
    } else if (id === undefined) {
      return undefined;
    } else if (id === '') {
      return undefined;
    }
    const doc = await getDoc(this.docRef(id));
    if (doc.exists()) {
      return doc.data();
    } else {
      console.error(Error('User Not Found'));
      return undefined;
    }
  };
  get$ = (id: string | null | undefined) => {
    if (id === null) {
      return of(null);
    } else if (id === undefined) {
      return of(undefined);
    } else if (id === '') {
      return of(undefined);
    }
    return docData(this.docRef(id));
  };
  $get = ($id: Signal<string | null | undefined>) => {
    return toSignal(toObservable($id).pipe(mergeMap((id) => this.get$(id))));
  };

  me = async () => {
    const authUser = this.authService.$authUser();
    if (!authUser) {
      console.error(Error('Unauthorized'));
      return undefined;
    }
    const user = await this.get(authUser.uid);
    if (!user) {
      console.error(Error('User Not Found'));
    }
    return user;
  };
  me$ = () => {
    return this.authService.authUser$.pipe(
      mergeMap((authUser) => this.get$(authUser?.uid)),
    );
  };
  $me = () => {
    return toSignal(this.me$());
  };

  list = async () => {
    return (await getDocs(this.collectionRef)).docs.map((doc) => doc.data());
  };
  list$ = (): Observable<User[]> => collectionData(this.collectionRef);
  $list = (): Signal<User[] | undefined> => toSignal(this.list$());

  create = async (newUser: NewUser) => {
    const id = ulid();
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;
    const user: User = { ...newUser, id, createdAt, updatedAt };
    return await this.set(user);
  };

  set = async (user: User) => {
    const tmpUser = await this.get(user.id);
    const now = new Date();
    if (tmpUser) {
      user.updatedAt = now;
    } else {
      user.createdAt = now;
      user.updatedAt = now;
    }
    return await setDoc(this.docRef(user.id), user);
  };

  setMerge = async (user: UpdatableUser) => {
    const tmpUser = await this.get(user.id);
    if (!tmpUser) {
      throw Error('User Not Found');
    }
    user.updatedAt = new Date();
    return await setDoc(this.docRef(user.id), user, { merge: true });
  };

  delete = async (id: string) => {
    return await deleteDoc(this.docRef(id));
  };
}
