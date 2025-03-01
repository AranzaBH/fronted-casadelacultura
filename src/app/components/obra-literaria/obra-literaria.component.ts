import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LibroFormComponent } from './obra-literaria-form.component';
import { Libro } from './Libro';
import { SplitButtonModule } from 'primeng/splitbutton';
import { LibroService } from './obra-literaria.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ObraLiterariaShowComponent } from './obra-literaria-show.component';
@Component({
  selector: 'app-libro-list',
  templateUrl: './obra-literaria.component.html',
  styleUrls:['./obra-literaria.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    LibroFormComponent,
    ObraLiterariaShowComponent,
    CardModule,
    SplitButtonModule,
    MenuModule 
  ]
})

export class LibroListComponent implements OnInit {
  listaLibro: Libro []=[];
  selectLibro: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  libroDialog = false;
  libroDialogShow = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;
  menuOpciones: any[] = []; 


  constructor(private libroService:LibroService,private location: Location) {


  }

  editar(libro: Libro): void {
      this.abrirForm();
      this.selectLibro = libro;
    }

    mostrar(libro: Libro): void {
      this.abrirShow();
      this.selectLibro = libro;
    }


  abrirForm() {
    this.selectLibro = new Libro();
    this.libroDialog = true;
  }

  abrirShow() {
    this.libroDialogShow = true;
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

   obtenerOpciones(libro: any): MenuItem[] {
    return [
      { 
        label: 'Ver datos', 
        icon: 'pi pi-eye', 
        command: () => this.mostrar(libro) 
      },

      { 
        label: 'Ver imagenes', 
        icon: 'pi pi-eye', 
        command: () => this.editar(libro) 
      },
      { 
        label: 'Editar', 
        icon: 'pi pi-pencil', 
        command: () => this.editar(libro) 
      },
      { 
        label: 'Eliminar', 
        icon: 'pi pi-trash', 
        command: () => this.confirmDelete(libro) 
      }
    ];
  }
  

   cerrarForm() {
    this.libroDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.libroService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaLibro=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(categoria: any) {
    this.selectLibro = categoria;
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
    if (this.selectLibro) {
      this.libroService.delete(this.selectLibro.id).subscribe({
        next: (response) => {
          this.message = 'Libro eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el libro.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


}
