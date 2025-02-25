import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ActividadService } from './actividad.service';
import { CuestionarioService } from '../cuestionario/cuestionario.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule, MatRadioModule, FormsModule],
  templateUrl: './actividades-component.component.html',
  styleUrls: ['./actividades-component.component.css'],
})
export class ActividadesComponent implements OnInit {
  actividad: any = null;
  cuestionario: any = null;
  idActividad!: number;
  idCuestionario!: number;
  respuestasSeleccionadas: { [key: number]: number } = {}; // Guarda la respuesta seleccionada por pregunta
  puntaje: number = 0;
  mostrarPuntaje: boolean = false;

  constructor(
    private actividadService: ActividadService,
    private cuestionarioService: CuestionarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idActividad = Number(params.get('idActividad'));
      console.log('ID de la actividad obtenido:', this.idActividad);

      if (this.idActividad) {
        this.cargarActividad();
      } else {
        console.error('Error: No se encontró un ID de actividad válido');
      }
    });
  }

  cargarActividad(): void {
    this.actividadService.obtenerActividadPorId(this.idActividad).subscribe({
      next: data => {
        console.log('Datos de la actividad recibidos:', data);
        this.actividad = data;

        if (this.actividad?.cuestionario?.idCuestionario) {
          this.idCuestionario = this.actividad.cuestionario.idCuestionario;
          console.log('ID del cuestionario obtenido:', this.idCuestionario);
          this.cargarCuestionario(this.idCuestionario);
        } else {
          console.warn('La actividad no tiene un cuestionario asociado');
        }
      },
      error: err => {
        console.error('Error al obtener la actividad:', err);
      }
    });
  }

  cargarCuestionario(idCuestionario: number): void {
    this.cuestionarioService.getCuestionarioById(idCuestionario).subscribe({
      next: cuestionario => {
        console.log('Datos del cuestionario recibidos:', cuestionario);
        if (cuestionario) {
          this.cuestionario = cuestionario;
        } else {
          console.warn('No se encontró el cuestionario con ID:', idCuestionario);
        }
      },
      error: err => {
        console.error('Error al obtener el cuestionario:', err);
      }
    });
  }

  seleccionarRespuesta(idPregunta: number, idRespuesta: number): void {
    this.respuestasSeleccionadas[idPregunta] = idRespuesta;
  }

  calcularPuntaje(): void {
    let puntajeTotal = 0;

    this.cuestionario.preguntas.forEach((pregunta: any) => {
      const respuestaCorrecta = pregunta.respuestas.find((r: any) => r.esCorrecta);
      if (respuestaCorrecta && this.respuestasSeleccionadas[pregunta.idPregunta] === respuestaCorrecta.idRespuesta) {
        puntajeTotal++;
      }
    });

    this.puntaje = puntajeTotal;
    this.mostrarPuntaje = true;
    console.log('Puntaje obtenido:', this.puntaje);
  }
}
