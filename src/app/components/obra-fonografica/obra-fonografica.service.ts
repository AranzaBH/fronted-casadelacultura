import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Autor } from '../autor/Autor';
import { ObraFonografica } from './ObraFonografica';


@Injectable({
  providedIn: 'root',
})
export class ObraFonograficaService {
  private apiUrl = environment.configuracion.url+'/api/fonograficas'; // Cambia esta URL según tu backend

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}


  // Obtener un taller por ID
  getObra(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getObraAutor(id: number): Observable<{ obra: ObraFonografica; autores: Autor[] }> {
    return this.http.get<{ obra: ObraFonografica; autores: Autor[] }>(`${this.apiUrl}/${id}`);
  }

  crearObra(obra: FormData) {
    return this.http.post(`${this.apiUrl}/crear`, obra);
  }
  

  // Actualizar un taller existente
  actualizarObra(id: number, obra: ObraFonografica): Observable<ObraFonografica> {
    return this.http.put<ObraFonografica>(`${this.apiUrl}/${id}`, obra, { headers: this.headers });
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
