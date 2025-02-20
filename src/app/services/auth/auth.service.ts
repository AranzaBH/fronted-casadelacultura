import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // Estado de si el usuario está logueado
  public loginStatusSubject = this.loggedIn.asObservable();
  private currentUser: any = null;  // Usuario actual

  constructor() {}

  // Simulación de método para verificar si el usuario está logueado
  public isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  // Obtener el usuario actual
  public getUser(): any {
    return this.currentUser;
  }

  // Verificar si el usuario es un administrador
  public isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  // Verificar si el usuario es un usuario normal
  public isUser(): boolean {
    return this.currentUser && this.currentUser.role === 'user';
  }

  // Método para login (aquí solo actualizamos el estado)
  public login(user: any): void {
    this.currentUser = user;
    this.loggedIn.next(true);  // Cambiar el estado a 'logueado'
  }

  // Método para logout
  public logout(): void {
    this.currentUser = null;
    this.loggedIn.next(false);  // Cambiar el estado a 'no logueado'
  }
  
  obtenerUsuarioId(): number {
    // Si usas JWT, el ID de usuario podría estar en el token. Aquí solo es un ejemplo.
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario.id || 0; // Retorna el ID del usuario, si está disponible
  }
}
