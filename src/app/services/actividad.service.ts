import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actividad {
  id:number;
  nombre: string;
  video?: { idVideo: number };
  cuestionario?: { idCuestionario: number } ;
  taller: { idTaller: number };
  modulo?: number;
  avance?: number;
  estatus?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private readonly apiUrl = 'http://localhost:8080/api/actividades';

  constructor(private http: HttpClient) {}

  crearActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  obtenerActividadesPorTaller(idTaller: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/taller/${idTaller}`);
  }
  obtenerActividadPorId(idActividad: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/${idActividad}`);
  }
}
