import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadService } from './actividad.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from './Actividad';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { CuestionarioService } from '../cuestionario/cuestionario.service';
import { VideoService } from '../video/video.service';
import { TallerService } from '../taller/taller.service';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent implements OnInit {
  actividadForm: FormGroup;
  talleres: any[] = [];
  cuestionarios: any[] = [];
  videos: any[] = [];
  idTaller: number | null = null;

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadService,
    private tallerService: TallerService,
    private cuestionarioService: CuestionarioService,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.actividadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      taller: [null, Validators.required],
      cuestionario: [null],
      video: [null],
      modulo: [null],
      avance: [0],
      estatus: [true],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idTallerParam = params.get('idTaller');
      if (idTallerParam) {
        this.idTaller = +idTallerParam;
        this.actividadForm.patchValue({ taller: this.idTaller });
      }
    });

    this.cargarTalleres();
    this.cargarCuestionarios();
    this.cargarVideos();
  }

  cargarTalleres(): void {
    this.tallerService.getAll().subscribe((data: any) => {
      this.talleres = data;
    });
  }

  cargarVideos(): void {
    this.videoService.obtenerTodosLosVideos().subscribe((data:any) => {
      this.videos = data;
    });
  }

  cargarCuestionarios(): void {
    this.cuestionarioService.obtenerCuestionarios().subscribe((data:any) => {
      this.cuestionarios = data;
    });
  }

  crearActividad(): void {
    if (this.actividadForm.valid) {
      const actividad: Actividad = {
        id: 0, // El ID se genera automáticamente en el backend
        nombre: this.actividadForm.value.nombre,
        video: this.actividadForm.value.video ? { id: this.actividadForm.value.video } : undefined,
        cuestionario: this.actividadForm.value.cuestionario ? { idCuestionario: this.actividadForm.value.cuestionario } : undefined,
        taller: { id: this.actividadForm.value.taller }, // Asegurar que sea { id: number }
        modulo: this.actividadForm.value.modulo || undefined,
        avance: this.actividadForm.value.avance || 0,
        estatus: this.actividadForm.value.estatus || false,
      };
      this.actividadService.crearActividad(actividad).subscribe({
        next: (data: Actividad) => {
          console.log('Actividad creada con éxito:', data);
          Swal.fire('Éxito', 'Actividad creada con éxito', 'success');
          this.actividadForm.reset();
        },
        error: (error) => {
          console.error('Error al crear la actividad:', error);
          Swal.fire('Error', 'No se pudo crear la actividad', 'error');
        },
      });
    } else {
      Swal.fire('Error', 'Por favor completa todos los campos obligatorios.', 'error');
    }
  }



  verActividades(taller: any): void {
    if (taller && taller.id) {
      this.router.navigate(['admin/actividades-taller/', taller.id]);
    } else {
      Swal.fire('Error', 'El taller seleccionado no es válido.', 'error');
    }
  }
  abrirSeleccionCuestionario() {
    console.log("Botón de imagen presionado. Abriendo selección de cuestionario...");
    // Aquí puedes abrir un modal o redirigir a otra página para agregar un cuestionario.
  }


  abrirSeleccionVideo() {
    console.log("Botón de agregar video presionado.");
    // Aquí puedes abrir un modal o una nueva página para seleccionar un video.
  }



}
