import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Materiales } from './Material';


@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class MaterialService {
  private raiz = `${environment.configuracion.url}/api/materiales`;
  constructor(private http: HttpClient) {}

  // Listar todas las categorías de obra
  listarMateriales(): Observable<Materiales[]> {
    return this.http.get<Materiales[]>(this.raiz);
  }
  

  // Obtener una categoría de obra por ID
  obtenerMaterialPorId(id: number): Observable<Materiales> {
    return this.http.get<Materiales>(`${this.raiz}/${id}`);
  }

  // Crear una nueva categoría de obra
  crearMaterial(material: Materiales): Observable<Materiales> {
    return this.http.post<Materiales>(this.raiz, material);
  }

  // Actualizar una categoría de obra existente
  actualizarMaterial(id: number, material: Materiales): Observable<Materiales> {
    return this.http.put<Materiales>(`${this.raiz}/${id}`, material);
  }

  // Eliminar una categoría de obra
  eliminarMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.raiz}/${id}`);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz+'/list',body);
  }

  get(id: number): Observable<Materiales> {
      return this.http.get<Materiales>(`${this.raiz}/${id}`);
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
