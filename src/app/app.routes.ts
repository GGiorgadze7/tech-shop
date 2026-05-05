import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Page404 } from './pages/page-404/page-404';
import { Signin } from './pages/auth/signin/signin';
import { Signup } from './pages/auth/signup/signup';

export const routes: Routes = [
  { path: '', component: Home, title: 'Tech Shop' },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'contact' },
  { path: 'signin', component: Signin, title: 'signin' },
  { path: 'signup', component: Signup, title: 'signup' },
  { path: '**', component: Page404, title: 'You Have Lost' },
];
