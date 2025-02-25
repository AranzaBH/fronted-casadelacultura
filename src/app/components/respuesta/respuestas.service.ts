import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Respuesta {
  idRespuesta?: number;
  respuesta: string;
  esCorrecta: boolean;
  fechaCreacion?: Date;
  preguntas: {
    idPregunta: number;  // Ahora puede ser undefined
  };
}

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  private apiUrl = 'http://localhost:8080/api/respuesta'; // Cambia la URL según la configuración de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las respuestas
  listarRespuestas(): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(this.apiUrl);
  }

  // Obtener una respuesta por su ID
  obtenerRespuestaPorId(idRespuesta: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(`${this.apiUrl}/${idRespuesta}`);
  }

  // Crear una nueva respuesta
  

  crearRespuesta(respuesta: Respuesta): Observable<any> {
    return this.http.post('http://localhost:8080/api/respuesta', respuesta);
  }
  
  // Actualizar una respuesta existente
  actualizarRespuesta(idRespuesta: number, respuesta: Respuesta): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${this.apiUrl}/${idRespuesta}`, respuesta);
  }

  // Eliminar una respuesta
  eliminarRespuesta(idRespuesta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idRespuesta}`);
  }
}
