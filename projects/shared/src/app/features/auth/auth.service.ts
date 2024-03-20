import { Injectable, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  linkWithPopup,
  idToken,
  user,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  $authUser = toSignal(user(this.auth));
  authUser$ = toObservable(this.$authUser);

  $authState = toSignal(authState(this.auth));
  authState$ = toObservable(this.$authState);

  $idToken = toSignal(idToken(this.auth));
  idToken$ = toObservable(this.$idToken);

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    return await signInWithPopup(this.auth, provider);
  }

  async signInWithTwitter() {
    const provider = new TwitterAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async signInWithGithub() {
    const provider = new GithubAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async signOut() {
    await signOut(this.auth);
  }

  async linkWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    const authUser = this.$authUser();
    if (authUser) {
      return await linkWithPopup(authUser, provider);
    } else {
      throw Error('Unauthorized');
    }
  }

  async linkWithTwitter() {
    const provider = new TwitterAuthProvider();
    const authUser = this.$authUser();
    if (authUser) {
      return await linkWithPopup(authUser, provider);
    } else {
      throw Error('Unauthorized');
    }
  }

  async linkWithGithub() {
    const provider = new GithubAuthProvider();
    const authUser = this.$authUser();
    if (authUser) {
      return await linkWithPopup(authUser, provider);
    } else {
      throw Error('Unauthorized');
    }
  }
}
