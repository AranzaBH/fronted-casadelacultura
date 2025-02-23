import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CategoriaLibro } from './CategoriaLibro';
import { debounceTime, Subject } from 'rxjs';
import { CategoriaLibroService } from './categoria-libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
import { CategoriaLibroFormComponent } from './categoria-libro-form.component';

@Component({
  selector: 'app-categoria-libro',
  templateUrl: './categoria-libro.component.html',
  styleUrls:['./categoria-libro.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    CardModule,
    CategoriaLibroFormComponent,
    
    
  ]
})
export class CategoriaLibroComponent implements OnInit {
  data: CategoriaLibro[] = [];
  selectedCategoria: any;
  deleteDialog: boolean = false;
  categoriaSelect!: CategoriaLibro;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  categoriaDialog = false;
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime = 800;
  
  @ViewChild('tablaB') tablaB: any;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  private categoriaService = inject(CategoriaLibroService);

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    });

    this.obtenerDatosTabla();
  }

  confirmDelete(categoria: any) {
    this.selectedCategoria = categoria;
    this.deleteDialog = true;
  }

  onSearch() {
    this.searchSubject.next(this.params.filtro);
  }

  abrirForm() {
    this.categoriaSelect = new CategoriaLibro();
    this.categoriaDialog = true;
  }

  cerrarForm() {
    this.categoriaDialog = false;
    this.obtenerDatosTabla();
  }

  obtenerDatosTabla(): void {
    this.categoriaService.getAll(this.params).subscribe((data: any) => {
      console.log("data obtenida", data);
      this.data = data.data;
      this.params.total = data.total;
    });
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
    this.params.max = e.rows || this.params.max;
    this.params.offset = e.first || 0;
    if (e.multiSortMeta) {
      this.params.sort = e.multiSortMeta;
    }
    this.obtenerDatosTabla();
  }

  editar(categoria: CategoriaLibro): void {
    this.abrirForm();
    this.categoriaSelect = categoria;
  }

  delete() {
    if (this.selectedCategoria) {
      this.categoriaService.delete(this.selectedCategoria.id).subscribe({
        next: () => {
          this.message = 'Categoría eliminada exitosamente';
          this.messageType = 'success';
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: () => {
          this.message = 'Hubo un problema al eliminar la categoría.';
          this.messageType = 'error';
          this.deleteDialog = false;
        }
      });
    }
  }
}
