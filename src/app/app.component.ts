import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="main-nav">
      <div class="logo-container">
        <!-- Usamos property binding con [src]="logoUrl" -->
        <img [src]="logoUrl" alt="Logo">

      </div>

      <ul class="nav-list">
        <li>
          <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Inicio
          </a>
        </li>
        
        <li class="dropdown">
          <a class="nav-link" routerLink="/obras" routerLinkActive="active">
            Pictorica
            <span class="dropdown-arrow">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a routerLink="/obras/pintura">Pintura</a></li>
            <li><a routerLink="/obras/escultura">Escultura</a></li>
            <li><a routerLink="/obras/artesania">Artesanía</a></li>
            <li><a routerLink="/obras/fotografia">Fotografía</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a class="nav-link" routerLink="/libros" routerLinkActive="active">
            Literarias
            <span class="dropdown-arrow">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a routerLink="/libros/literatura">Literatura</a></li>
            <li><a routerLink="/libros/historia">Historia</a></li>
            <li><a routerLink="/libros/arte">Arte</a></li>
            <li><a routerLink="/libros/cultura">Cultura</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a class="nav-link" routerLink="/eventos" routerLinkActive="active">
            Fonografica
            <span class="dropdown-arrow">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a routerLink="/eventos/exposiciones">Exposiciones</a></li>
            <li><a routerLink="/eventos/talleres">Talleres</a></li>
            <li><a routerLink="/eventos/conferencias">Conferencias</a></li>
            <li><a routerLink="/eventos/presentaciones">Presentaciones</a></li>
          </ul>
        </li>
        <li>
          <a class="nav-link" routerLink="/Talleres" routerLinkActive="active">Talleres</a>
        </li>
        <li>
          <a class="nav-link" routerLink="/iniciarsesion" routerLinkActive="active">Iniciar Sesion</a>
        </li>
      </ul>
    </nav>

    <div class="main-container">
      <router-outlet></router-outlet>
    </div>

    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Ubicación</h3>
          <p>González Ortega 403, Zona Feb 10 2015, Centro, 68000 Oaxaca de Juárez, Oax.</p>
          <p>Centro Histórico</p>
          <p>Oaxaca de Juárez, Oaxaca</p>
        </div>
        <div class="footer-section">
          <h3>Horario</h3>
          <p>Lunes a Viernes: 9:00 - 20:00</p>
          <p>Sábados: 10:00 - 18:00</p>
          <p>Domingos: 10:00 - 14:00</p>
        </div>
        <div class="footer-section">
          <h3>Contacto</h3>
          <p>Tel. 9515161154</p>
        </div>
      </div>
      <div class="copyright">
        <p>© 2025 Casa de la Cultura Oaxaqueña. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    .main-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background-color: #c4647f;
    }
    
    .logo-container {
      display: flex;
      align-items: center;
    }

    .logo {
      max-width: 100px;
      height: auto;
      display: block;
    }

    .nav-list {
      list-style: none;
      display: flex;
      gap: 20px;
      padding: 0;
      margin: 0;
    }

    .nav-link {
      text-decoration: none;
      color: white;
      font-weight: bold;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      background-color: white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      padding: 10px;
    }

    .dropdown:hover .dropdown-menu {
      display: block;
    }

    .main-footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'Casa de la Cultura Oaxaqueña';
  // Definimos la ruta de la imagen
  logoUrl: string = 'assets/images/logCC.png';
}
