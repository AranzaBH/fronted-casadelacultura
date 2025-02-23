import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaObra } from './CategoriaObra';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class CategoriaObraService {
  private raiz = `${environment.configuracion.url}/api/categoriaobra`;
  constructor(private http: HttpClient) {}

  // Listar todas las categorías de obra
  listarCategorias(): Observable<CategoriaObra[]> {
    return this.http.get<CategoriaObra[]>(this.raiz);
  }

  // Obtener una categoría de obra por ID
  obtenerCategoriaPorId(id: number): Observable<CategoriaObra> {
    return this.http.get<CategoriaObra>(`${this.raiz}/${id}`);
  }

  // Crear una nueva categoría de obra
  crearCategoria(categoria: CategoriaObra): Observable<CategoriaObra> {
    return this.http.post<CategoriaObra>(this.raiz, categoria);
  }

  // Actualizar una categoría de obra existente
  actualizarCategoria(id: number, categoria: CategoriaObra): Observable<CategoriaObra> {
    return this.http.put<CategoriaObra>(`${this.raiz}/${id}`, categoria);
  }

  // Eliminar una categoría de obra
  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.raiz}/${id}`);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz+'/list',body);
  }

  get(id: number): Observable<CategoriaObra> {
      return this.http.get<CategoriaObra>(`${this.raiz}/${id}`);
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
