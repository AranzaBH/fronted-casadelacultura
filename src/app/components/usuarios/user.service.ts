import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    raiz:string= environment.configuracion.url + '/api/admin';

    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user: any) {
        return this.httpClient.post(`${this.raiz}/crear-usuario`, user);
    }

    public añadirUsuarioTalleristaGalerista(user: any) {
        return this.httpClient.post(`${this.raiz}/usuarios`, user);
    }

    public añadirUsuarioRol(user: any, rol: string) {
        return this.httpClient.post(`${this.raiz}/crear-usuario?rolNombre=${rol}`, user);
    }
}