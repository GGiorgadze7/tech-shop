import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Page404 } from './pages/page-404/page-404';
import { guestGuard } from './services/guards/guest-guard';
import { authGuard } from './services/guards/auth-guard';
import { cartGuard } from './services/guards/cart-guard';
import { Passrecover } from './pages/auth/passrecover/passrecover';

export const routes: Routes = [
  { path: '', component: Home, title: 'Tech Shop' },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'contact' },

  {
    path: 'user',
    loadComponent: () => import('./pages/auth/user/user').then((m) => m.User),
    canActivate: [authGuard],
  },

  {
    path: 'signin',
    loadComponent: () => import('./pages/auth/signin/signin').then((m) => m.Signin),
    canActivate: [guestGuard],
  },

  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup').then((m) => m.Signup),
    canActivate: [guestGuard],
  },

  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
    // canActivate: [cartGuard],
  },

  {
    path: 'passrecover',
    loadComponent: () => import('./pages/auth/passrecover/passrecover').then((m) => m.Passrecover),
  },

  {
    path: 'passrecover2',
    loadComponent: () => import('./pages/auth/passrecover2/passrecover2').then((m) => m.Passrecover2),
  },

  { path: '**', component: Page404, title: 'You Have Lost' },
];
