
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Usuario } from './Usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  actualizaRegistros = new Subject<boolean>();
  registroEdita      = new Subject<Usuario>;
  raiz:string= environment.configuracion.url+'/api/admin'

  constructor(private http: HttpClient) {

  }

  actualiza(recibe: boolean):void{
    this.actualizaRegistros.next(recibe);
  }

  edita(usuario : Usuario): void{
    this.registroEdita.next(usuario);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz+'/list',body);
  }

  get(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.raiz}/obtener/${id}`);
  }

  save(obj: any) {
    return this.http.post(this.raiz+`/crear-usuario?rolNombre=${obj.rol}`, obj);
  }

    update(obj: any) {
      console.log("lefieie")
      const url = `${this.raiz}/editar/${obj.id}`;
      const headers = new HttpHeaders().set('rolNombre', obj.rol);
      return this.http.put(url, obj, { headers });
    }



  delete(id: number) {
    return this.http.delete(this.raiz + '/' + id);
  }

  getTalleres(){
    return this.http.get(this.raiz+'/obtener');
  }


}
