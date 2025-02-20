import { Component, OnInit } from '@angular/core';
import { TallerService } from './taller.service';
import { Router } from '@angular/router'; // Inyectamos el Router
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InscripcionService } from '../../services/inscripcion.service';
import { ImagenesService } from '../../services/imagenes.service';
import{LoginService} from './../../services/auth/login.service';
@Component({
  selector: 'app-talleres-user',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule],
  templateUrl: './talleres-user.component.html',
  styleUrls: ['./talleres-user.component.css'],
})
export class TalleresUserComponent implements OnInit {
  user: any = null;
  talleres: any[] = []; // Lista de talleres del usuario
  errorMessage: string | null = null; // Manejo de errores
  imagenes: any[] = [];
  constructor(
    private inscripcionesService: InscripcionService,
    private tallerService: TallerService,
    private router: Router,
    private loginService: LoginService,
    private imagenesService: ImagenesService // Inyectamos el Router
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.cargarTalleres();
  }

  cargarTalleres(): void {
    console.log('Usuario:', this.user);
    const idUsuario = this.user.id; // Aquí debes obtener el ID del usuario dinámicamente (por ejemplo desde un servicio de autenticación)

    this.inscripcionesService.obtenerInscripcionesPorUsuario(idUsuario).subscribe({
      next: (inscripciones) => {
        this.talleres = inscripciones.map((inscripcion: any) => inscripcion.taller);
      },
      error: (err) => {
        console.error('Error al cargar los talleres inscritos:', err);
      },
    });
  }

  // Cuando se hace clic en un taller, redirige al componente de actividades del taller
  verActividades(taller: any): void {
    
      this.router.navigate(['admin/actividades-taller/', taller]);  // Redirige a actividades-taller
    
  }
  cargarImagenes(): void {
    this.imagenesService.listarImagenes().subscribe({
      next: (imagenes) => {
        this.imagenes = imagenes;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar las imágenes.';
      },
    });
  }
}
