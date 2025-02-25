import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pregunta {
  idPregunta?: number;
  pregunta: string;
}

export interface Respuesta {
  idRespuesta?: number;
  respuesta: string;
  esCorrecta: boolean;
  preguntas: {
    idPregunta: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PreguntasRespuestasService {
  private preguntasUrl = 'http://localhost:8080/api/pregunta'; // URL para preguntas
  private respuestasUrl = 'http://localhost:8080/api/respuesta'; // URL para respuestas

  constructor(private http: HttpClient) {}

  // Crear una pregunta
  crearPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.preguntasUrl, pregunta);
  }

  // Crear una respuesta
  crearRespuesta(respuesta: Respuesta): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.respuestasUrl, respuesta);
  }
}
