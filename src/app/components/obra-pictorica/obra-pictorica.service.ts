import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Autor } from '../autor/Autor';
import { ObraPictorica } from './ObraPictorica';


@Injectable({
  providedIn: 'root',
})
export class ObraPictoricaService {
  private apiUrl = environment.configuracion.url+'/api/obra'; // Cambia esta URL según tu backend

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}


  // Obtener un taller por ID
  getObra(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getObraAutor(id: number): Observable<{ obra: ObraPictorica; autores: Autor[] }> {
    return this.http.get<{ obra: ObraPictorica; autores: Autor[] }>(`${this.apiUrl}/${id}`);
  }

  crearObra(obra: FormData) {
    return this.http.post(`${this.apiUrl}/crear`, obra);
  }
  

  // Actualizar un taller existente
  actualizarObra(id: number, obra: ObraPictorica): Observable<ObraPictorica> {
    return this.http.put<ObraPictorica>(`${this.apiUrl}/${id}`, obra, { headers: this.headers });
  }

  // Eliminar un taller por ID
  eliminarObra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(idObra?: number, formData?: FormData) {
    return this.http.put(`${this.apiUrl}/actualizar/${idObra}`, formData);
  }

  // Desactivar un taller por ID
  desactivarObra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/desactivar/${id}`);
  }


  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.apiUrl+'/list',body);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
