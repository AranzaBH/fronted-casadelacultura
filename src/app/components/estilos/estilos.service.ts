import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment';
import { Estilos } from './Estilos';


@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class EstilosService {
  private raiz = `${environment.configuracion.url}/api/estilo`;
  constructor(private http: HttpClient) {}

  // Listar todas las categorías de obra
  listarEstilos(): Observable<Estilos[]> {
    return this.http.get<Estilos[]>(this.raiz);
  }
  

  // Obtener una categoría de obra por ID
  obtenerEstiloPorId(id: number): Observable<Estilos> {
    return this.http.get<Estilos>(`${this.raiz}/${id}`);
  }

  // Crear una nueva categoría de obra
  crearEstilo(estilo: Estilos): Observable<Estilos> {
    return this.http.post<Estilos>(this.raiz, estilo);
  }

  // Actualizar una categoría de obra existente
  actualizarEstilo(id: number, estilos: Estilos): Observable<Estilos> {
    return this.http.put<Estilos>(`${this.raiz}/${id}`, estilos);
  }

  // Eliminar una categoría de obra
  eliminarEstilo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.raiz}/${id}`);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz+'/list',body);
  }

  get(id: number): Observable<Estilos> {
      return this.http.get<Estilos>(`${this.raiz}/${id}`);
  }

  save(obj: any) {
    return this.http.post(this.raiz, obj);
  }

  update(obj: any) {
    return this.http.put(this.raiz + '/' + obj.id, obj);
  }

  delete(id: number) {
    return this.http.delete(this.raiz + '/' + id);
  }


}
