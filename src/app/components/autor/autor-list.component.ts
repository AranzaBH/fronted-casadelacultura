import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AutorFormComponent } from './autor-form.component';
import { Autor } from './Autor';
import { AutorService } from './autor.service';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls:['./autor-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    AutorFormComponent,
    CardModule
  ]
})

export class AutorListComponent implements OnInit {
  listaAutor: Autor []=[];
  selectAutor: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  autorDialog = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;


  constructor(private autorService:AutorService,private location: Location) {


  }

  editar(autor: Autor): void {
      this.abrirForm();
      this.selectAutor = autor;
    }

  abrirForm() {
    this.selectAutor = new Autor();
    this.autorDialog = true;
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
    this.autorDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.autorService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaAutor=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(categoria: any) {
    this.selectAutor = categoria;
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
    if (this.selectAutor) {
      this.autorService.delete(this.selectAutor.id).subscribe({
        next: (response) => {
          this.message = 'Autor eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el autor.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


}
