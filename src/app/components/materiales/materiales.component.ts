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
import { MaterialesFormComponent } from './materiales-form.component';
import { Material } from './Material';
import { MaterialService } from './material.service';
@Component({
  selector: 'app-material-list',
  templateUrl: './materiales.component.html',
  styleUrls:['./materiales.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    MaterialesFormComponent,
    CardModule
  ]
})

export class MaterialListComponent implements OnInit {
  listaMaterial: Material []=[];
  selectMaterial: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  materiakDialog = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;


  constructor(private materialService:MaterialService,private location: Location) {


  }

  editar(material: Material): void {
      this.abrirForm();
      this.selectMaterial = material;;
    }

  abrirForm() {
    this.selectMaterial = new Material();
    this.materiakDialog = true;
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
    this.materiakDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.materialService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaMaterial=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(categoria: any) {
    this.selectMaterial = categoria;
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
    if (this.selectMaterial) {
      this.materialService.delete(this.selectMaterial.id).subscribe({
        next: (response) => {
          this.message = 'Material eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el material.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


}
