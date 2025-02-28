import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenesLiterariasService {
  private baseUrl = 'http://localhost:8080/api/imagenesliterarias'; 

  constructor(private http: HttpClient) {}

  subirImagen(file: File, idLibro?: number): Observable<any> {
    const formData = new FormData();
    if(!idLibro)idLibro=0;
    formData.append('archivo', file); 
    formData.append('idLibro', idLibro.toString());

    return this.http.post(`${this.baseUrl}`, formData);
  }

}
