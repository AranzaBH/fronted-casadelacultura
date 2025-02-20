import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private baseUrl = 'http://localhost:8080/api/imagenespictorica'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Listar todas las imágenes
  listarImagenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Obtener una imagen por ID
  obtenerImagenPorId(idImagen: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idImagen}`);
  }

  // Subir una nueva imagen
  subirImagen(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }

  // Actualizar una imagen existente
  actualizarImagen(idImagen: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.put<any>(`${this.baseUrl}/${idImagen}`, formData);
  }

  // Eliminar una imagen por ID
  eliminarImagen(idImagen: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idImagen}`);
  }
}
