import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioFormuComponent } from './usuario-formu.component';
import { Usuario } from './Usuario';
import { UsuarioService } from './usuario.service';
import { CardModule } from 'primeng/card';

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
    CardModule,
    UsuarioFormuComponent // Si deseas incluir el formulario dentro de este componente
  ],
  templateUrl: './usuario-list.component.html',
  styleUrls:['./usuario-list.component.css']
})

export class UsuarioListComponent implements OnInit {
  data: Usuario[] = [];
  selectedUsuario?: any;
  deleteDialog: boolean = false;
  usuarioSelect!: Usuario;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  usuarioDialog = false;
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime = 800;
  @ViewChild('tablaB') tablaB: any;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  constructor(private usuarioService: UsuarioService,private router: Router, private location: Location) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla()

  }

  confirmDelete(usuario: any) {
    this.selectedUsuario = usuario;
    this.deleteDialog = true;
  }

  onSearch() {
    this.searchSubject.next(this.params.filtro);
  }

  abrirForm() {
    this.usuarioSelect = new Usuario();
    this.usuarioDialog = true;
  }

  cerrarForm() {
    this.usuarioDialog = false;
    this.obtenerDatosTabla();
  }

  obtenerDatosTabla(): void {
    this.usuarioService.getAll(this.params).subscribe(
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

  editar(usuario: Usuario): void {
    this.abrirForm();
    this.usuarioSelect = usuario;
  }

  delete() {

    if (this.selectedUsuario) {
      const activo=this.selectedUsuario.enabled;
      this.usuarioService.delete(this.selectedUsuario.id).subscribe({
        next: (response) => {
          if(activo){
            this.message = 'Usuario bloqueado exitosamente';
          }else{
            this.message = 'Usuario desbloqueado exitosamente';
          }

          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el usuario.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }


  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
  }

}
