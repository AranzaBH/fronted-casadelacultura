import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home/home2.component';
import { CategoriaLibroComponent } from './components/categoria-libro/categoria-libro.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'categoria-libro',
    component:CategoriaLibroComponent
  },
  {
    path: 'prueba',
    component: Home2Component
  },
  {
    path: '**',
    redirectTo: ''
  }
];