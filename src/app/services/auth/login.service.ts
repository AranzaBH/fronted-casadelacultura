import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // Generar el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  // Obtener el usuario actual
  public getCurrentUser() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${baserUrl}/actual-usuario`, { headers });
  }

  // Iniciar sesión y guardar el token en localStorage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // Verificar si el usuario está conectado
  public isLoggedIn() {
    const token = this.getToken();
    return token != null && token !== '';
  }

  // Cerrar sesión
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubjec.next(false);
    return true;
  }

  // Obtener el token
  public getToken() {
    return localStorage.getItem('token');
  }

  // Guardar el usuario en localStorage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener el usuario desde localStorage
  public getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Obtener el rol del usuario
  public getUserRole() {
    const user = this.getUser();
    return user?.authorities?.[0]?.authority || null;
    
  }
}
