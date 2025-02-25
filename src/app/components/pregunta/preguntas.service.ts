import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pregunta {
  idPregunta?: number;
  pregunta: string;
  fechaCreacion?: Date;
  cuestionario: {
    idCuestionario: number;
  };
  activacion?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  private apiUrl = 'http://localhost:8080/api/pregunta'; // URL base del controlador de preguntas

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las preguntas
   * @returns Observable con la lista de preguntas
   */
  listarPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiUrl);
  }

  /**
   * Obtener una pregunta por ID
   * @param idPregunta ID de la pregunta a buscar
   * @returns Observable con los datos de la pregunta
   */
  obtenerPreguntaPorId(idPregunta: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.apiUrl}/${idPregunta}`);
  }

  /**
   * Crear una nueva pregunta
   * @param pregunta Datos de la pregunta a crear
   * @returns Observable con la pregunta creada
   */
  crearPregunta(pregunta: Pregunta): Observable<Pregunta> {
    // Cuando enviamos la pregunta, aseguramos que se estructure correctamente
    const nuevaPregunta = {
      pregunta: pregunta.pregunta,
      fechaCreacion: new Date(),  // Puedes ajustar la fecha o enviarla desde el frontend
      cuestionario: {
        idCuestionario: pregunta.cuestionario.idCuestionario,
      },
      activacion: true,  // Definido por defecto, o puede venir de la UI
    };

    return this.http.post<Pregunta>(this.apiUrl, nuevaPregunta);
  }

  /**
   * Actualizar una pregunta existente
   * @param idPregunta ID de la pregunta a actualizar
   * @param pregunta Datos actualizados de la pregunta
   * @returns Observable con la pregunta actualizada
   */
  actualizarPregunta(idPregunta: number, pregunta: Pregunta): Observable<Pregunta> {
    return this.http.put<Pregunta>(`${this.apiUrl}/${idPregunta}`, pregunta);
  }

  /**
   * Eliminar una pregunta
   * @param idPregunta ID de la pregunta a eliminar
   * @returns Observable que indica el resultado de la operación
   */
  eliminarPregunta(idPregunta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idPregunta}`);
  }
}
