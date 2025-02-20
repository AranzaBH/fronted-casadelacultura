import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = 'http://localhost:8080/api/assets'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Subir imagen al servidor
  subirImagen(file: File): Observable<{ key: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ key: string; url: string }>(`${this.baseUrl}/upload`, formData);
  }

  // Obtener imagen desde el servidor
  obtenerImagen(key: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/get-object?key=${key}`, {
      responseType: 'blob',
    });
  }

  // Eliminar imagen del servidor
  eliminarImagen(key: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-object?key=${key}`);
  }
}
