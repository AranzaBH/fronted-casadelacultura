
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
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ObraPictoricaShowComponent } from './obra-pictorica-show.component';
import { ObraPictoricaFormComponent } from './obra-pictorica-form.component';
import { ObraPictorica } from './ObraPictorica';
import { ObraPictoricaService } from './obra-pictorica.service';
@Component({
    selector: 'app-obra-pictorica',
    templateUrl: './obra-pictorica.component.html',
    styleUrls:['./obra-pictorica.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    ObraPictoricaFormComponent,
    ObraPictoricaShowComponent,
    CardModule,
    SplitButtonModule,
    MenuModule 
  ]
})

export class ObraPictoricaListComponent implements OnInit {
  listaObra: ObraPictorica []=[];
  selectObra: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  obraDialog = false;
  obraDialogShow = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;
  menuOpciones: any[] = []; 


  constructor(private obraService:ObraPictoricaService,private location: Location) {


  }

  editar(obra: ObraPictorica): void {
      this.abrirForm();
      this.selectObra = obra;
    }

    mostrar(obra: ObraPictorica): void {
      this.abrirShow();
      this.selectObra = obra;
    }


  abrirForm() {
    this.selectObra = new ObraPictorica();
    this.obraDialog = true;
  }

  abrirShow() {
    this.obraDialogShow = true;
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
    this.obraDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.obraService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaObra=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(categoria: any) {
    this.selectObra = categoria;
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
    if (this.selectObra) {
      this.obraService.delete(this.selectObra.id).subscribe({
        next: (response) => {
          this.message = 'Obra eliminada exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar la obra.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


}
