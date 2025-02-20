import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private baseUrl = 'http://localhost:8080/api/inscripciones'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Obtener todas las inscripciones
  obtenerInscripciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Obtener una inscripción por ID
  obtenerInscripcionPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva inscripción
  crearInscripcion(inscripcion: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, inscripcion);
  }

  // Actualizar una inscripción
  actualizarInscripcion(id: number, inscripcion: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, inscripcion);
  }

  // Eliminar una inscripción por ID
  eliminarInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener inscripciones por usuario (Corregido)
  obtenerInscripcionesPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  obtenerInscripcionPorUsuarioYTaller(idUsuario: number, idTaller: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${idUsuario}/${idTaller}`);
  }
}
