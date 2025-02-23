import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Tecnica } from './Tecnica';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TecnicaService {
  actualizaRegistros = new Subject<boolean>();
  registroEdita = new Subject<Tecnica>;
  private raiz = `${environment.configuracion.url}/api/tecnica`;

  constructor(private http: HttpClient) { }

  // Obtener todas las técnicas
  listarTecnicas(): Observable<Tecnica[]> {
    return this.http.get<Tecnica[]>(this.raiz);
  }

  // Obtener una técnica por su ID
  obtenerTecnicaPorId(idTecnica: number): Observable<Tecnica> {
    return this.http.get<Tecnica>(`${this.raiz}/${idTecnica}`);
  }

  // Crear una nueva técnica
  crearTecnica(tecnica: Tecnica): Observable<Tecnica> {
    return this.http.post<Tecnica>(this.raiz, tecnica);
  }

  // Actualizar una técnica existente
  actualizarTecnica(idTecnica: number, tecnica: Tecnica): Observable<Tecnica> {
    return this.http.put<Tecnica>(`${this.raiz}/${idTecnica}`, tecnica);
  }

  // Eliminar una técnica
  eliminarTecnica(idTecnica: number): Observable<void> {
    return this.http.delete<void>(`${this.raiz}/${idTecnica}`);
  }

  actualiza(recibe: boolean): void {
    this.actualizaRegistros.next(recibe);
  }

  edita(tecnica: Tecnica): void {
    this.registroEdita.next(tecnica);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz + '/list', body);
  }

  get(id: number): Observable<Tecnica> {
    return this.http.get<Tecnica>(`${this.raiz}/${id}`);
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
