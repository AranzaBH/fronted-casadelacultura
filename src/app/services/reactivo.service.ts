import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cuestionario {
  idCuestionario: number;
}

export interface Reactivo {
  idReactivo?: number;
  pregunta: string;
  respuestaCorrecta: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4?: string | null;
  respuesta5?: string | null;
  cuestionario: Cuestionario;
}

@Injectable({
  providedIn: 'root',
})
export class ReactivoService {
  private readonly apiUrl = 'http://localhost:8080/api/reactivos';

  constructor(private http: HttpClient) {}

  getReactivos(): Observable<Reactivo[]> {
    return this.http.get<Reactivo[]>(this.apiUrl);
  }

  getReactivoById(id: number): Observable<Reactivo> {
    return this.http.get<Reactivo>(`${this.apiUrl}/${id}`);
  }

  createReactivo(reactivo: Reactivo): Observable<Reactivo> {
    return this.http.post<Reactivo>(this.apiUrl, reactivo);
  }

  updateReactivo(id: number, reactivo: Reactivo): Observable<Reactivo> {
    return this.http.put<Reactivo>(`${this.apiUrl}/${id}`, reactivo);
  }

  deleteReactivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getReactivosPorCuestionario(idCuestionario: number): Observable<Reactivo[]> {
    return this.http.get<Reactivo[]>(`${this.apiUrl}/cuestionario/${idCuestionario}`);
  }
}
