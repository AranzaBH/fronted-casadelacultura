import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TecnicaFormComponent } from './tecnica-form.component';
import { Tecnica } from './Tecnica';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { TecnicaService } from './tecnicas.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-tecnica-list',
  templateUrl: './tecnica-list.component.html',
  styleUrls:['./tecnica-list.component.css'],
  standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      TableModule,
      PaginatorModule,
      DialogModule,
      ButtonModule,
      CardModule,
      TecnicaFormComponent // Si deseas incluir el formulario dentro de este componente
    ],
})

export class TecnicaListComponent implements OnInit {
  data: Tecnica[] = [];
  selectedTecnica: any;
  deleteDialog: boolean = false;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  tecnicaDialog = false;
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime = 800;
  @ViewChild('tablaB') tablaB: any;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  constructor(private tecnicaService: TecnicaService,private router: Router, private location: Location) { }


  ngOnInit() {
      this.searchSubject.pipe(
        debounceTime(this.debounceTime)
      ).subscribe(() => {
        this.obtenerTabla();
      })
      this.obtenerDatosTabla()
      

    }

    confirmDelete(tipoTaller: any) {
      this.selectedTecnica = tipoTaller;
      this.deleteDialog = true;
    }

    onSearch() {
      this.searchSubject.next(this.params.filtro);
    }

    abrirForm() {
      this.selectedTecnica = new Tecnica(0, '', '');
      this.tecnicaDialog = true;
    }
    
    

    cerrarForm() {
      this.tecnicaDialog = false;
      this.obtenerDatosTabla();
    }

    obtenerDatosTabla(): void {
      this.tecnicaService.getAll(this.params).subscribe(
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

    editar(tecnica: Tecnica): void {
      this.abrirForm();
      this.selectedTecnica = tecnica;
    }

    delete() {
      if (this.selectedTecnica) {
        this.tecnicaService.delete(this.selectedTecnica.id).subscribe({
          next: (response) => {
            this.message = 'Tecnica eliminado exitosamente';
            this.messageType = 'success';

            setTimeout(() => {
              this.message = '';
              this.messageType = '';
            }, 1500);
            this.obtenerDatosTabla();
            this.deleteDialog = false;
          },
          error: (err) => {
            this.message =  'Hubo un problema al eliminar la tecnica.';
            this.messageType = 'error';
            this.deleteDialog = false;
          },
        });
      }
    }

    crearTecnica() {
      this.router.navigate(['/admin/crearT/taller']);
    }

    regresar(): void {
      this.location.back(); // Regresa a la vista anterior
    }

}
