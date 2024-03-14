import { Injectable, inject } from '@angular/core';
import { NewUser, UpdatableUser, User } from './user.model';
import { Observable } from 'rxjs';
import { UserFirebaseService } from './user-firebase.service';

export interface IUserService {
  get: (id: string | null | undefined) => Promise<User | null | undefined>;
  get$: (id: string | null | undefined) => Observable<User | null | undefined>;
  me: () => Promise<User | null | undefined>;
  me$: () => Observable<User | null | undefined>;
  list: () => Promise<User[]>;
  list$: () => Observable<User[]>;
  create: (newUser: NewUser) => Promise<void>;
  set: (user: User) => Promise<void>;
  setMerge: (user: UpdatableUser) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private iUserService: IUserService = inject(UserFirebaseService);

  get = this.iUserService.get;
  get$ = this.iUserService.get$;
  list = this.iUserService.list;
  list$ = this.iUserService.list$;
  me = this.iUserService.me;
  me$ = this.iUserService.me$;
  create = this.iUserService.create;
  set = this.iUserService.set;
  setMerge = this.iUserService.setMerge;
  delete = this.iUserService.delete;
}
