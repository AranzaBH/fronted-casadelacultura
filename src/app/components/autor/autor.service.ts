import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from './Autor';
import { environment } from '../../environments/environment';
// Definir la interfaz para Autor

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  raiz = `${environment.configuracion.url}/api/autor`;
  constructor(private http: HttpClient) {}

  listarAutores(): Observable<Autor[]> {
      return this.http.get<Autor[]>(this.raiz);
    }

    // Obtener una categoría de obra por ID
    obtenerAutorPorId(id: number): Observable<Autor> {
      return this.http.get<Autor>(`${this.raiz}/${id}`);
    }

    // Crear una nueva categoría de obra
    crearAutor(autor: Autor): Observable<Autor> {
      return this.http.post<Autor>(this.raiz, autor);
    }

    // Actualizar una categoría de obra existente
    actualizarAutor(id: number, autor: Autor): Observable<Autor> {
      return this.http.put<Autor>(`${this.raiz}/${id}`, autor);
    }

    // Eliminar una categoría de obra
    eliminarAutor(id: number): Observable<void> {
      return this.http.delete<void>(`${this.raiz}/${id}`);
    }

    getAll(params?: any) {
      const body = params || {};
      return this.http.post(this.raiz+'/list',body);
    }

    get(id: number): Observable<Autor> {
        return this.http.get<Autor>(`${this.raiz}/${id}`);
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
