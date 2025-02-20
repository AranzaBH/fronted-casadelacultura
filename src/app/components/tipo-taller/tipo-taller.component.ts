import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoTaller } from './TipoTaller';
import { Subject } from 'rxjs';
import { TipoTallerService } from './tipo-taller.service';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TipoTallerFormComponent } from './tipo-taller-form.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipo-taller',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    TipoTallerFormComponent // Si deseas incluir el formulario dentro de este componente
  ],
  templateUrl: './tipo-taller.component.html',
  styleUrls:['./tipo-taller.component.css']
})

export class TipoTallerComponent implements OnInit {
  data: TipoTaller[] = [];
  selectedTaller: any;
  deleteDialog: boolean = false;
  tipoTallerSelect!: TipoTaller;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  tipoTallerDialog = false;
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime = 800;
  @ViewChild('tablaB') tablaB: any;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  constructor(private tipoTallerService: TipoTallerService,private router: Router, private location: Location) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla()

  }

  confirmDelete(tipoTaller: any) {
    this.selectedTaller = tipoTaller;
    this.deleteDialog = true;
  }

  onSearch() {
    this.searchSubject.next(this.params.filtro);
  }

  abrirForm() {
    this.tipoTallerSelect = new TipoTaller();
    this.tipoTallerDialog = true;
  }

  cerrarForm() {
    this.tipoTallerDialog = false;
    this.obtenerDatosTabla();
  }

  obtenerDatosTabla(): void {
    this.tipoTallerService.getAll(this.params).subscribe(
      (data: any) => {
        this.data = data.data;
        this.params.total = data.total;
      }
    )
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

  editar(tipoTaller: TipoTaller): void {
    this.abrirForm();
    this.tipoTallerSelect = tipoTaller;
  }

  delete() {
    if (this.selectedTaller) {
      this.tipoTallerService.delete(this.selectedTaller.id).subscribe({
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

  crearTaller() {
    this.router.navigate(['/admin/crearT/taller']);
  }

  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
  }

}
