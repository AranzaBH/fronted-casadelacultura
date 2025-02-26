import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cuestionario } from './Cuestionario';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  actualizaRegistros = new Subject<boolean>();
    registroEdita      = new Subject<Cuestionario>;
    apiUrl:string= environment.configuracion.url+'/api/cuestionario';

  constructor(private http: HttpClient) { }

  getTalleres(): Observable<Cuestionario[]> {
      return this.http.get<Cuestionario[]>(`${this.apiUrl}`);
    }
  // Obtener todos los cuestionarios
  getCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  obtenerCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  // Obtener un cuestionario por su ID
  getCuestionarioById(id: number): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo cuestionario
  createCuestionario(cuestionario: Cuestionario): Observable<Cuestionario> {
    return this.http.post<Cuestionario>(this.apiUrl, cuestionario).pipe(
      catchError(this.handleError)
    );
  }
  // En tu servicio, no necesitas cambiar nada si el backend devuelve el objeto Cuestionario directamente.



  // Actualizar un cuestionario existente
  updateCuestionario(id: number, cuestionario: Cuestionario): Observable<Cuestionario> {
    return this.http.put<Cuestionario>(`${this.apiUrl}/${id}`, cuestionario).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un cuestionario
  deleteCuestionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Desactivar un cuestionario
  desactivarCuestionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/desactivar/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
