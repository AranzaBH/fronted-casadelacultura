import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home/home2.component';
import { CategoriaLibroComponent } from './components/categoria-libro/categoria-libro.component';

import { SignupComponent } from './components/signup/signup.component';
import { ListaTalleresComponent } from './components/taller/lista-talleres.component';
import { TallerComponent } from './components/taller/taller.component';
import { TalleresUserComponent } from './components/taller/talleres-user.component';
import { UserDashboardComponent } from './components/taller/user-dashboard.component';
import { VerTalleresComponent } from './components/taller/ver-talleres.component';
import { TipoTallerComponent } from './components/tipo-taller/tipo-taller.component';
import { TalleristaComponent } from './components/tallerista/tallerista.component';
import { TipoTallerFormComponent } from './components/tipo-taller/tipo-taller-form.component';
import { CategoriaObraListComponent } from './components/categoria-obra/categoria-obra-list.component';
import { TecnicaListComponent } from './components/tecnicas/tecnica-list.component';
import { VideoListComponent } from './components/video/video-list.component';
import { AutorListComponent } from './components/autor/autor-list.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list.component';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuariosComponent } from './components/usuarios/crear-usuarios.component';
import { ProfileComponent } from './components/usuarios/profile.component';
import UsuarioFormComponent from './components/usuarios/usuario-form.component';
import { VerActividadesUsuarioComponent } from './components/usuarios/ver-actividades-usuario.component';
import { ActividadesComponent } from './components/actividades/actividades-component.component';
import { ActividadesTallerComponent } from './components/actividades/actividades-taller.component';
import { CrearActividadComponent } from './components/actividades/crear-actividad.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { LibroListComponent } from './components/obra-literaria/obra-literaria.component';
import { ObraPictoricaListComponent } from './components/obra-pictorica/obra-pictorica.component';

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
    path:'libro',
    component:LibroListComponent
  },

  {
    path:'obra-pictorica',
    component:ObraPictoricaListComponent
  },

  {
    path:'categoria-obra',
    component:CategoriaObraListComponent
  },


  {
    path:'tecnica',
    component:TecnicaListComponent
  },

  {
    path:'autor',
    component:AutorListComponent
  },

  {
    path:'usuarios',
    component:UsuarioListComponent
  },

  {
    path:'video',
    component:VideoListComponent
  },

  {
    path: 'prueba',
    component: Home2Component
  },
  {
    path: 'login', //iniciar sesión
    component: LoginComponent
  },
  {
    path: 'signup', //registrarse
    component: SignupComponent
  },
  {
    path: 'crear-usuario', //registrarse
    component: CrearUsuariosComponent
  },
  {
    path: 'profile', //registrarse
    component: ProfileComponent
  },
  {
    path: 'usuario-form', //registrarse
    component: UsuarioFormComponent
  },
  {
    path: 'ver-actividades', //registrarse
    component: VerActividadesUsuarioComponent
  },


//-----------------------------------Tallerista----------------------------------
  {
   path: 'tallerista', //Dashboard Tallerista
   component: TalleristaComponent
   },

  {
    path: 'lista-talleres', //lista-talleres
    component: ListaTalleresComponent
  },

  {
    path: 'taller', //taller
    component: TallerComponent
  },

  {
    path: 'talleres-user', 
    component: TalleresUserComponent
  },

  {
    path: 'user/dashboard',
    component: UserDashboardComponent
  },

  {
    path: 'ver/talleres', 
    component: VerTalleresComponent
  },


  {
    path: 'tipo-taller',  //crear categoria de talleres
    component: TipoTallerComponent
  },

  {
    path: 'crear-taller',  //crear talleres
    component: TallerComponent
  },

  {
    path: 'tipo-tallerform',  //no sirve JAJA
    component: TipoTallerFormComponent
  },

  {
    path: 'ver-taller',  //crear talleres
    component:VerTalleresComponent
  },




//-----------------------------------Actividades----------------------------------

{
  path: 'actividades-component',  //DETALLES DE LA ACTIVIDAD
  component: ActividadesComponent
},
{
  path: 'actividades-taller',  // ACTIVIDADES POR TALLER 
  component: ActividadesTallerComponent
},
{
  path: 'crear-actividad',  // CREAR ACTIVIDAD
  component: CrearActividadComponent
},
{
  path: 'ver-actividad-usuario',  //
  component: VerActividadesUsuarioComponent
},

{
  path: 'cuestionario',  //
  component: CuestionarioComponent
},


  {
    path: '**',
    redirectTo: ''
  }


  
  
];