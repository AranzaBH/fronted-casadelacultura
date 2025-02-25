import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ObraPictoricaService {
  private apiUrl = environment.configuracion.url+'/api/libro'; // Cambia esta URL según tu backend

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  
}
