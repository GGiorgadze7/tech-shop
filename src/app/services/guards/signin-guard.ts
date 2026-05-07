import { CanActivateFn, Router } from '@angular/router';

export const signinGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('access_token');

  if (isLoggedIn) {
    return true;
  } else {
    const route = new Router();
    route.navigate(['/signin']);
    return false;
  }
};
