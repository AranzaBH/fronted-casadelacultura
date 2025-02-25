import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from './Actividad';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  raiz:string= environment.configuracion.url + '/api/actividades';
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.raiz);
  }

  crearActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.raiz, actividad);
  }

  eliminarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.raiz}/${id}`);
  }

  buscarActividadPorNombre(nombre: string): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.raiz}/buscar?nombre=${nombre}`);
  }
  buscarActividadPorTaller(taller: number): Observable<Actividad[]> {
    return this.http.get<any[]>(`${this.raiz}/taller/${taller}`);
  }
  obtenerActividadPorId(idActividad: number): Observable<Actividad> {
      return this.http.get<Actividad>(`${this.raiz}/${idActividad}`);
    }

  

  
  

}