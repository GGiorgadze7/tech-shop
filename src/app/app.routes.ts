import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Page404 } from './pages/page-404/page-404';
import { guestGuard } from './services/guards/guest-guard';
import { authGuard } from './services/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Tech Shop' },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'contact',
  },

  {
    path: 'user',
    loadComponent: () => import('./pages/auth/user/user').then((m) => m.User),
    title: 'user',
    canActivate: [authGuard],
  },

  {
    path: 'signin',
    loadComponent: () => import('./pages/auth/signin/signin').then((m) => m.Signin),
    title: 'signin',
    canActivate: [guestGuard],
  },

  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup').then((m) => m.Signup),
    title: 'signup',
    canActivate: [guestGuard],
  },

  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
    title: 'cart',
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetails),
    title: 'product-details',
  },

  {
    path: 'passrecover',
    loadComponent: () => import('./pages/auth/passrecover/passrecover').then((m) => m.Passrecover),
    title: 'emailrecovery',
  },

  {
    path: 'passrecover2',
    loadComponent: () =>
      import('./pages/auth/passrecover2/passrecover2').then((m) => m.Passrecover2),
    title: 'passrecovery',
  },

  { path: '**', component: Page404, title: 'You Have Lost' },
];
