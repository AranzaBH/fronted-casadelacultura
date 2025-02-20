import { Component, OnInit, ViewChild } from '@angular/core';
import { TallerService } from './taller.service';
import { Taller } from './Taller';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TipoTaller } from '../tipo-taller/TipoTaller';
import { TipoTallerService } from '../tipo-taller/tipo-taller.service';
@Component({
  selector: 'app-taller',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
            PaginatorModule,
            DialogModule

  ],
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
})
export class TallerComponent implements OnInit {
  talleres: Taller[] = [];
  data: Taller[] = [];
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  selectedTaller: any;
  deleteDialog: boolean = false;
  tiposTaller: TipoTaller[] = [];
  today: string = '';
  nuevoTaller: Taller = {
    titulo: '',
    descripcion: '',
    tipoTaller: { id: 0 , nombre : ''}, // Inicialización del objeto
    fechaInico: '',
    fechaFinal: '',
    clave: '',
  };
  busqueda: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';
  titulo: string='';
  private searchSubject: Subject<string> = new Subject<string>();
   @ViewChild('tablaB') tablaB: any;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  debounceTime = 800;
  constructor(
    private tallerService: TallerService,
    private tipoTallerService: TipoTallerService,
    private location: Location,
    private router: Router,) {}

  ngOnInit(): void {
    this.obtenerTalleres();
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla();
    this.obtenerTipoTalleres();
    this.today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato 'YYYY-MM-DD' para evitar la selección de fechas pasadas
  }


  editar(taller:any){
    this.nuevoTaller=taller;
  }
  

  limpiar(){
    this.nuevoTaller = {
      titulo: '',
      descripcion: '',
      tipoTaller: { id: 0 , nombre : '' },
      fechaInico: '',
      fechaFinal: '',
      clave: '',
      imagenPath: '',
    };
  }
  crearActividad(taller: any) {
    // Implementa la lógica para crear una actividad
    // Puede ser una navegación a otra página, la apertura de un formulario, o lo que requieras
    console.log('Crear actividad para el taller:', taller);
  }
  
  confirmDelete(taller:any){
    this.selectedTaller = taller;
    this.deleteDialog = true;
  }

  onSearch() {
    this.searchSubject.next(this.params.filtro);
  }

  obtenerTipoTalleres(): void {
    this.tipoTallerService.getTalleres().subscribe({
      next: (data: any) => {
        console.log("data",data)
        this.tiposTaller = data.data; // Asegúrate de que `data.data` contiene los tipos de taller
        this.titulo = data.titulo;
      },
      error: (error) => {
        console.error('Error al obtener tipos de taller:', error);
      }
    });
  }



  obtenerTalleres(): void {
    /*
    this.tallerService.getAll().subscribe({
      next: (data) => {
        this.talleres = data;
        this.limpiarMensajes();
      },
      error: () => {
        this.mensajeError = 'Error al obtener talleres.';
      },
    });*/
  }

  buscarTaller(): void {
    if (this.busqueda.trim()) {
      this.tallerService.buscarTallerPorTitulo(this.busqueda).subscribe({
        next: (data) => {
          this.talleres = data;
          this.limpiarMensajes();
        },
        error: () => {
          this.mensajeError = 'Error al buscar talleres.';
        },
      });
    } else {
      this.obtenerTalleres(); // Si no hay búsqueda, muestra todos
    }
  }

  guardarTaller() {
    if (
      !this.nuevoTaller.titulo ||
      !this.nuevoTaller.descripcion ||
      !this.nuevoTaller.tipoTaller.id ||
      !this.nuevoTaller.fechaInico ||
      !this.nuevoTaller.fechaFinal ||
      !this.nuevoTaller.clave
    ) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    if (this.nuevoTaller.fechaInico < this.today) {
      this.mensajeError = 'La fecha de inicio no puede ser anterior a hoy';
      return;
    }
    
    if (this.nuevoTaller.fechaFinal < this.nuevoTaller.fechaInico) {
      this.mensajeError = 'La fecha final no puede ser anterior a la fecha de inicio';
      return;
    }

    const fechaInicio = new Date(this.nuevoTaller.fechaInico);
    const fechaFinal = new Date(this.nuevoTaller.fechaFinal);
    const diferenciaMeses = (fechaFinal.getFullYear() - fechaInicio.getFullYear()) * 12 + (fechaFinal.getMonth() - fechaInicio.getMonth());
    
    if (diferenciaMeses < 6) {
      this.mensajeError = 'Las fechas deben tener al menos 6 meses de diferencia';
      return;
    }

    if (this.nuevoTaller.id) {
      this.actualizarTaller();
    } else {
      this.crearTaller();
    }
  }

  actualizarTaller():void{

    this.tallerService.update(this.nuevoTaller).subscribe({
      next: (data: any) => {
        console.log("this data",data)
        if (data.success) {
          this.message = 'Taller actualizado exitosamente';
          this.messageType = 'success';
this.limpiar();
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el taller.';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
        }
      },
      error: () => {
        this.message = 'Hubo un problema al comunicar con el servidor.';
        this.messageType = 'error';
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
        }, 1500);
      }
    })

  }

  crearTaller(): void {


    // Asegurarse de que las fechas estén en formato 'yyyy-MM-dd'
    this.nuevoTaller.fechaInico = new Date(this.nuevoTaller.fechaInico).toISOString().split('T')[0];
    this.nuevoTaller.fechaFinal = new Date(this.nuevoTaller.fechaFinal).toISOString().split('T')[0];
console.log("esto se envia")
    this.tallerService.crearTaller(this.nuevoTaller).subscribe(
      (data) => {
        this.message = 'Taller guardado exitosamente';
          this.messageType = 'success';
        console.log('Taller creado con éxito:', data);
        this.obtenerDatosTabla(); // Actualiza la lista de talleres
        this.nuevoTaller = {
          titulo: '',
          descripcion: '',
          tipoTaller: { id: 0 , nombre : '' },
          fechaInico: '',
          fechaFinal: '',
          clave: '',
          imagenPath: '',
        }; // Limpia el formulario
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
        }, 1500);
        this.mensajeError = '';
      },
      (error) => {
        this.message = 'Error al guardar el taller.';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
        console.error('Error al crear el taller:', error);
        //this.mensajeError = 'Error al crear el taller';
      }
    );
  }


  eliminarTaller(idTaller: number): void {
    this.tallerService.desactivarTaller(idTaller).subscribe({
      next: () => {
        this.obtenerTalleres(); // Refresca la lista de talleres
        this.mensajeExito = 'Taller desactivado con éxito.'; // Mensaje de éxito
      },
      error: () => {
        this.mensajeError = 'Error al desactivar el taller.'; // Mensaje de error
      },
    });
  }


  limpiarMensajes(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  reiniciarFormulario(): void {
    this.nuevoTaller = {
       titulo: '',
      descripcion: '',
      tipoTaller: { id: 0 , nombre : ''},
      fechaInico: '',
      fechaFinal: '',
      clave: '',
    };
    this.limpiarMensajes();
  }

  verTaller() {
    this.router.navigate(['/admin/crearT']);
  }

  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
  }

  obtenerTabla(): void {
    if (this.tablaB) {
      this.tablaB.first = 0;
      this.tablaB.rows = 10;
      this.tablaB.firstChange.emit(this.tablaB.first);
      this.mPaginacion(this.tablaB.createLazyLoadMetadata());
    }
  }


  mPaginacion(e: any): void {
    if (e.rows) {
      this.params.max = e.rows;
    }

    if (e.first) {
      this.params.offset = e.first;
    } else {
      this.params.offset = 0;
    }
    if (e.multiSortMeta) {
      this.params.sort = e.multiSortMeta;
    }
    this.obtenerDatosTabla();
  }

  obtenerDatosTabla(): void {
    this.tallerService.getAll(this.params).subscribe(
      (data: any) => {
        console.log("esto se obtiene",data)
        this.data = data.data;
        this.params.total = data.total;
      }
    )
  }

  delete() {
    if (this.selectedTaller) {
      this.tallerService.delete(this.selectedTaller.id).subscribe({
        next: (response) => {
          this.message = 'Taller eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el taller.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }






}
