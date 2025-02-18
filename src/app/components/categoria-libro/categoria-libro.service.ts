import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable, inject } from "@angular/core";  // <-- Importa inject()
import { CategoriaLibro } from './CategoriaLibro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaLibroService {

  actualizaRegistros = new Subject<boolean>();
  registroEdita = new Subject<CategoriaLibro>();
  raiz: string = environment.configuracion.url + '/api/categorialiteraria';

  private http = inject(HttpClient);  // <-- Usa inject(HttpClient)

  constructor() { }

  actualiza(recibe: boolean): void {
    this.actualizaRegistros.next(recibe);
  }

  edita(categoriaLibro: CategoriaLibro): void {
    this.registroEdita.next(categoriaLibro);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz + '/list', body);
  }

  get(id: number): Observable<CategoriaLibro> {
    return this.http.get<CategoriaLibro>(`${this.raiz}/${id}`);
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
