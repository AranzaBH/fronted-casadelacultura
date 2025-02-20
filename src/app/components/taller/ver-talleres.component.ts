import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TallerService } from './taller.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Taller } from './Taller';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ver-talleres',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule, RouterModule,TableModule,
              PaginatorModule,
              DialogModule,
            MatInputModule,FormsModule],
  templateUrl: './ver-talleres.component.html',
  styleUrls: ['./ver-talleres.component.css'],
})
export class VerTalleresComponent {
  talleres: any[] = []; // Lista de talleres
  private searchSubject: Subject<string> = new Subject<string>();
     @ViewChild('tablaB') tablaB: any;
    params: any = { total: 0, max: 0, offset: 0, filtro: '' };
    debounceTime = 800;
    data: Taller[] = [];


  constructor(private tallerService: TallerService, private router: Router, private location: Location) {}


  onSearch() {
    this.searchSubject.next(this.params.filtro);
  }


  ngOnInit(): void {
    this.cargarTalleres();

    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla();
  }

  // Cargar todos los talleres
  cargarTalleres(): void {
    this.tallerService.getTalleres().subscribe(
      (data: any) => {
        this.talleres = data;
      },
      (error) => {
        console.error('Error al cargar talleres:', error);
      }
    );
  }

  // Redirigir a actividades del taller
  verActividades(taller: any): void {
    console.log('Taller seleccionado:', taller);  // Verifica que el taller tiene un idTaller
    const idTaller = taller.id; // Usamos idTaller en lugar de id
    if (idTaller) {
      this.router.navigate(['admin/actividades-taller', idTaller]);  // Redirige a actividades-taller
    } else {
      console.error('El taller no tiene un id válido');
    }
  }

  crearTaller() {
    this.router.navigate(['/admin/crearT']);
  }

  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
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

  obtenerDatosTabla(): void {
    this.tallerService.getAll(this.params).subscribe(
      (data: any) => {
        console.log("esto se obtiene",data)
        this.data = data.data;
        this.params.total = data.total;
      }
    )
  }




}
