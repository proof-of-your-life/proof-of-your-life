import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthenticated$ = toObservable(
    computed(() => Boolean(authService.$authUser()?.uid)),
  );
  isAuthenticated$.pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated === undefined) {
        console.log(`route.url = ${_route.url}`);
        console.log(`state.url = ${_state.url}`);
        router.navigate(['/auth/sign-in']);
      } else if (isAuthenticated !== null) {
        console.log(`route.url = ${_route.url}`);
        console.log(`state.url = ${_state.url}`);
        router.navigate([_state.url]);
      }
    }),
  );
  return isAuthenticated$;
};
