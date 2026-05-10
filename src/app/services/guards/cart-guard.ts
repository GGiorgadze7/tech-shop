import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const cartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('access_token');

  if (isLoggedIn) {
    return true;
  } else {
    return router.createUrlTree(['/signin']);
  }
};
