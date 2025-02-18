import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaObraService } from './categoria-obra.service';
import { CategoriaObra } from './CategoriaObra';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CategoriaObraFormComponent } from './categoria-obra-form.component';
@Component({
  selector: 'app-categoria-obra-list',
  templateUrl: './categoria-obra-list.component.html',
  styleUrls:['./categoria-obra-lis.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    CategoriaObraFormComponent
  ]
})

export class CategoriaObraListComponent implements OnInit {
  listaCategoria: CategoriaObra []=[];
  selectCategoria: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  categoriaDialog = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;


  constructor(private categoriaObraService:CategoriaObraService,private location: Location) {


  }

  editar(categoria: CategoriaObra): void {
      this.abrirForm();
      this.selectCategoria = categoria;;
    }

  abrirForm() {
    this.selectCategoria = new CategoriaObra();
    this.categoriaDialog = true;
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla()

   }

   onSearch(){
    this.searchSubject.next(this.params.filtro);
   }

   cerrarForm() {
    this.categoriaDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.categoriaObraService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaCategoria=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(categoria: any) {
    this.selectCategoria = categoria;
    this.deleteDialog = true;
  }

  obtenerTabla(): void {
    if (this.tablaB) {
      this.tablaB.first = 0;
      this.tablaB.rows = 10;
      this.tablaB.firstChange.emit(this.tablaB.first);
      this.mPaginacion(this.tablaB.createLazyLoadMetadata());
    }
  }

  mPaginacion(e: any): void{
    if (e.rows){
      this.params.max = e.rows;
    }
    if(e.first){
      this.params.offset = e.first;
          }
          else{
            this.params.offset=0;
          }
          if (e.multiSortMeta) {
            this.params.sort = e.multiSortMeta;
          }
          this.obtenerDatosTabla();

  }

  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
  }


  delete() {
    if (this.selectCategoria) {
      this.categoriaObraService.delete(this.selectCategoria.id).subscribe({
        next: (response) => {
          this.message = 'Categoría eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el categoría.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


}
