import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../helper';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
    raiz:string= environment.configuracion.url + '/api/admin/crear-usuario?rolNombre=';
    raiz2:string= environment.configuracion.url + '/api/admin/crear-usuario?rolNombre=NORMAL';

    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user:any){
      return this.httpClient.post(`${this.raiz2}`,user);
    }
    public añadirUsuarioTalleristaGalerista(user:any){
      return this.httpClient.post(`${this.raiz}/usuarios/`,user);
    }
    public añadirUsuarioRol(user: any, rol: string) {
      return this.httpClient.post(`${this.raiz}${rol}`, user);
    }
    
}
