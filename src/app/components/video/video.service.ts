import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './Video';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  raiz:string= environment.configuracion.url+'/api/video';

  constructor(private http: HttpClient) {}

  obtenerTodosLosVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.raiz);
  }

  obtenerVideoPorId(idVideo: number): Observable<Video> {
    return this.http.get<Video>(`${this.raiz}/${idVideo}`);
  }

  crearVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.raiz, video);
  }

  actualizarVideo(idVideo: number, video: Video): Observable<Video> {
    return this.http.put<Video>(`${this.raiz}/${idVideo}`, video);
  }

  eliminarVideo(idVideo: number): Observable<void> {
    return this.http.delete<void>(`${this.raiz}/${idVideo}`);
  }


   getAll(params?: any) {
      const body = params || {};
      return this.http.post(this.raiz+'/list',body);
    }

    get(id: number): Observable<Video> {
        return this.http.get<Video>(`${this.raiz}/${id}`);
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
