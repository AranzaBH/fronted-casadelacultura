import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taller } from './Taller';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private apiUrl = environment.configuracion.url+'/api/taller'; // Cambia esta URL según tu backend

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Obtener todos los talleres


  getTalleres(): Observable<Taller[]> {
    return this.http.get<Taller[]>(`${this.apiUrl}`);
  }

  // Obtener talleres con filtros opcionales
  getTalleresConFiltro(filtros: { [key: string]: any }): Observable<Taller[]> {
    const params = new HttpParams({ fromObject: filtros });
    return this.http.get<Taller[]>(`${this.apiUrl}/filtro`, { params });
  }

  // Obtener un taller por ID
  getTaller(idTaller: number): Observable<Taller> {
    return this.http.get<Taller>(`${this.apiUrl}/${idTaller}`);
  }

  // Crear un nuevo taller
  crearTaller(taller: Taller): Observable<Taller> {
    return this.http.post<Taller>(this.apiUrl, taller, { headers: this.headers });
  }

  // Actualizar un taller existente
  actualizarTaller(idTaller: number, taller: Taller): Observable<Taller> {
    return this.http.put<Taller>(`${this.apiUrl}/${idTaller}`, taller, { headers: this.headers });
  }

  // Eliminar un taller por ID
  eliminarTaller(idTaller: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idTaller}`);
  }

  update(obj: any) {
    return this.http.put(this.apiUrl + '/' + obj.id, obj);
  }

  // Desactivar un taller por ID
  desactivarTaller(idTaller: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/desactivar/${idTaller}`);
  }

  // Buscar talleres por título
  buscarTallerPorTitulo(titulo: string): Observable<Taller[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<Taller[]>(`${this.apiUrl}/buscar`, { params });
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.apiUrl+'/list',body);
  }

  delete(idTaller: number) {
    return this.http.delete(this.apiUrl + '/desactivar/' + idTaller);
  }
}
