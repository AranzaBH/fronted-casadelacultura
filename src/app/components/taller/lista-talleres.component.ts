import { Component, OnInit, ViewChild } from '@angular/core';
import { TallerService } from './taller.service';
import { Taller } from './Taller';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-lista-talleres',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    TableModule,
    PaginatorModule,
    DialogModule
  ],
  templateUrl: './lista-talleres.component.html',
  styleUrls: ['./lista-talleres.component.css']
})
export class ListaTalleresComponent implements OnInit {
  data: Taller[] = [];
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  selectedTaller: any;
  deleteDialog: boolean = false;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime = 800;
  @ViewChild('tablaB') tablaB: any;

  constructor(
    private tallerService: TallerService,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    });
    this.obtenerDatosTabla();
  }

  onSearch(): void {
    this.searchSubject.next(this.params.filtro);
  }

  obtenerDatosTabla(): void {
    this.tallerService.getAll(this.params).subscribe(
      (data: any) => {
        console.log("Datos obtenidos:", data);
        this.data = data.data;
        this.params.total = data.total;
      },
      (error) => {
        console.error('Error al obtener datos de la tabla', error);
      }
    );
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

  confirmDelete(taller: any): void {
    this.selectedTaller = taller;
    this.deleteDialog = true;
  }

  delete(): void {
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
          this.message = 'Hubo un problema al eliminar el taller.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }

  editar(taller: any): void {
    // Redirige al usuario a la ruta de edición del taller.
    // Asegúrate de que la ruta '/talleres/editar/:id' esté definida en tu módulo de rutas
    this.router.navigate(['/talleres/editar', taller.id]);
  }

  regresar(): void {
    this.location.back();
  }
}
