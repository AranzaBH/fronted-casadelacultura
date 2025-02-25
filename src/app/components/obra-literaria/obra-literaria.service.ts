import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Libro } from './Libro';


@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private apiUrl = environment.configuracion.url+'/api/libro'; // Cambia esta URL según tu backend

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}


  // Obtener un taller por ID
  getLibro(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo taller
  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro, { headers: this.headers });
  }

  // Actualizar un taller existente
  actualizarLibro(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro, { headers: this.headers });
  }

  // Eliminar un taller por ID
  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(obj: any) {
    return this.http.put(this.apiUrl + '/' + obj.id, obj);
  }

  // Desactivar un taller por ID
  desactivarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/desactivar/${id}`);
  }


  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.apiUrl+'/list',body);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/desactivar/' + id);
  }
}
