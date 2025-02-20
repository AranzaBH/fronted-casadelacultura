import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TallerService } from './taller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { catchError, of } from 'rxjs';
import { InscripcionService } from '../../services/inscripcion.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/auth/login.service';

// Declaramos bootstrap para usar su API (asegúrate de que Bootstrap 5 esté incluido en tu proyecto)
declare var bootstrap: any;

@Component({
  selector: 'app-taller-details',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './taller-details.component.html',
  styleUrls: ['./taller-details.component.css']
})
export class TallerDetailsComponent implements OnInit {
  taller: any = null; // Detalles del taller inicializados en null
  idTaller: number | undefined;
  usuario: any = null;
  cargando: boolean = false; // Indicador de carga

  constructor(
    private route: ActivatedRoute,
    private tallerService: TallerService,
    private inscripcionService: InscripcionService, 
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener ID del taller desde la ruta
    this.idTaller = +this.route.snapshot.paramMap.get('id')!;
    this.usuario = this.loginService.getUser();

    if (isNaN(this.idTaller)) {
      console.error('ID de taller inválido');
      return;
    }

    this.cargarDetallesTaller();
  }

  // Método para cargar detalles del taller
  cargarDetallesTaller(): void {
    this.cargando = true;
    this.tallerService.getTaller(this.idTaller!)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los detalles del taller', error);
          return of(null); // Devuelve null en caso de error
        })
      )
      .subscribe((data: any) => {
        this.taller = data;
        this.cargando = false;
      });
  }

  inscribirse(): void {
    // Verificar si el usuario está autenticado
    if (!this.usuario) {
      alert('Debes iniciar sesión para inscribirte en un taller.');
      this.router.navigate(['/login']); // Redirigir a la página de login si no está autenticado
      return;
    }
  
    // Verificar si el usuario tiene un ID
    if (!this.usuario.id) {
      alert('Error: No se pudo encontrar el ID del usuario.');
      return;
    }
  
    const fechaInscripcion = new Date().toISOString();
  
    // Crear el objeto de inscripción con los datos necesarios
    const inscripcion = {
      usuario: { id: this.usuario.id }, // Obtener ID del usuario autenticado
      fechaInscripcion: fechaInscripcion, // Fecha de inscripción (ISO string)
      taller: { id: this.taller.id }, // ID del taller
      avanceGeneral: 0, // Valor inicial del avance
    };
  
    // Llamar al servicio para crear la inscripción
    this.inscripcionService.crearInscripcion(inscripcion)
      .pipe(
        catchError((error) => {
          console.error('Error al inscribirse al taller', error);
          console.log(inscripcion);
          // Si el error proviene de que ya está inscrito, podrías detectarlo aquí
          // Por ejemplo, si el error tiene un status 409 (conflicto) o un mensaje específico:
          if (error.status === 409 || (error.error && error.error.message === 'Ya inscrito')) {
            // Mostrar modal con mensaje de "ya inscrita"
            this.mostrarModal('Ya estás inscrita en el taller.');
            // Retornar un observable para completar la cadena
            return of(null);
          }
          alert('Ya estas inscrito en el taller');
          return of(null); // Devuelve null en caso de error
        })
      )
      .subscribe((response: any) => {
        console.log('Respuesta del servicio:', response);
        if (response) {
          let modalMessage = '';
          if (response.alreadyInscribed) {
            modalMessage = 'Ya estás inscrita en el taller.';
          } else {
            modalMessage = 'Inscripción exitosa. Ya te has inscrito en el taller.';
          }
          this.mostrarModal(modalMessage);
        }
      });
      
  }
  
  /**
   * Función para mostrar el modal de inscripción con un mensaje personalizado.
   * @param message El mensaje que se mostrará en el modal.
   */
  private mostrarModal(message: string): void {
    const modalElement = document.getElementById('enrollModal');
    if (modalElement) {
      // Actualizar el contenido del modal
      const modalBody = modalElement.querySelector('.modal-body');
      if (modalBody) {
        modalBody.innerHTML = message;
      }
      const enrollModal = new bootstrap.Modal(modalElement);
      enrollModal.show();
    }
  }
  
}