import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from './actividad.service';
import { LoginService } from '../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TallerService } from '../taller/taller.service';

@Component({
  selector: 'app-actividades-taller',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule, FormsModule],
  templateUrl: './actividades-taller.component.html',
  styleUrls: ['./actividades-taller.component.css'],
})
export class ActividadesTallerComponent implements OnInit {
  idTaller: number | null = null;
  taller: any = [];
  actividades: any[] = [];
  usuario: any = null;

  constructor(
    private route: ActivatedRoute,
    private tallerService: TallerService,
    private actividadService: ActividadService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.loginService.getUser();
    this.route.paramMap.subscribe((params) => {
      const idTallerParam = params.get('id');
      if (idTallerParam) {
        this.idTaller = Number(idTallerParam);
        if (!isNaN(this.idTaller)) {
          this.obtenerTaller(this.idTaller);
          this.obtenerActividades(this.idTaller);
        } else {
          console.error('ID del taller no es un número válido:', idTallerParam);
        }
      }
    });
  }

  crearActividad(): void {
    this.router.navigate([`admin/crear-actividad/${this.idTaller}`]);
  }

  obtenerTaller(idTaller: number): void {
    this.tallerService.getTaller(idTaller).subscribe({
      next: (taller) => {
        this.taller = taller;
      },
      error: (err) => {
        console.error('Error al obtener el taller:', err);
      },
    });
  }

  obtenerActividades(idTaller: number): void {
    this.actividadService.buscarActividadPorTaller(idTaller).subscribe({
      next: (actividades: any) => {
        this.actividades = actividades;
      },
      error: (err) => {
        console.error('Error al obtener las actividades:', err);
      },
    });
  }

  verDetalles(idActividad: number): void {
    if (this.usuario?.id) {
      this.router.navigate(['admin/actividades_detalles', idActividad, this.idTaller, this.usuario.id]);
    } else {
      console.error('El usuario no tiene un ID válido');
    }
  }
}
