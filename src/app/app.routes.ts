import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Page404 } from './pages/page-404/page-404';


export const routes: Routes = [
    {path:'', component:Home, title:'Tech Shop'},
    {path:'about', component:About, title:'About'},
    {path:'contact', component:Contact, title:'contact'},
    {path:'**', component:Page404, title:"You Have Lost"}
];
