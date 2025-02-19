import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="main-nav">
      <ul class="nav-list">
        <li><a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
        
        <li class="dropdown">
          <a class="nav-link" routerLink="/obras" routerLinkActive="active">
            Obras
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
            Libros
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
            Eventos
            <span class="dropdown-arrow">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a routerLink="/eventos/exposiciones">Exposiciones</a></li>
            <li><a routerLink="/eventos/talleres">Talleres</a></li>
            <li><a routerLink="/eventos/conferencias">Conferencias</a></li>
            <li><a routerLink="/eventos/presentaciones">Presentaciones</a></li>
          </ul>
        </li>

        <li><a class="nav-link" routerLink="/contacto" routerLinkActive="active">Contacto</a></li>
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
  `
})
export class AppComponent {
  title = 'Casa de la Cultura Oaxaqueña';
}