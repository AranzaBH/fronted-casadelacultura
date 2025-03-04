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
import { EstilosFormComponent } from './estilos-form.component';
import { Estilos } from './Estilos';
import { EstilosService } from './estilos.service';
@Component({
  selector: 'app-estilo-list',
  templateUrl: './estilos.component.html',
  styleUrls:['./estilos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    EstilosFormComponent,
    CardModule
  ]
})

export class EstilosListComponent implements OnInit {
  listaEstilo: Estilos []=[];
  selectEstilo: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  estiloDialog = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;


  constructor(private estiloService:EstilosService,private location: Location) {


  }

  editar(estilo: Estilos): void {
      this.abrirForm();
      this.selectEstilo = estilo;;
    }

  abrirForm() {
    this.selectEstilo = new Estilos();
    this.estiloDialog = true;
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
    this.estiloDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.estiloService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaEstilo=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(estilo: any) {
    this.selectEstilo = estilo;
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
    if (this.selectEstilo) {
      this.estiloService.delete(this.selectEstilo.id).subscribe({
        next: (response) => {
          this.message = 'Estilo eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el estilo.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


}
