import { Component, OnInit, ViewChild } from '@angular/core';
import { Video } from './Video';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { VideoService } from './video.service';
import { VideoFormComponent } from './video-form.component';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls:['./video-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    VideoFormComponent,
    CardModule
  ]
})

export class VideoListComponent implements OnInit {
  listaVideo: Video []=[];
  selectVideo: any;
  deleteDialog: boolean = false;
  params: any = {total: 0, max:0, offset:0, filtro: ''}
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime=2000
  videoDialog = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  @ViewChild('tablaB') tablaB: any;


  constructor(private videoService:VideoService,private location: Location) {


  }

  editar(video: Video): void {
      this.abrirForm();
      this.selectVideo = video;
    }

  abrirForm() {
    this.selectVideo = new Video();
    this.videoDialog = true;
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla()

   }

   onSearch(){
    this.searchSubject.next(this.params.filtro);
   }

   cerrarForm() {
    this.videoDialog = false;
    this.obtenerDatosTabla();
  }
  obtenerDatosTabla(): void{
    this.videoService.getAll(this.params).subscribe(
      (response: any)=> {
        console.log("this response",response)
        this.listaVideo=response.data;
        this.params.total=response.total;
      }
    )
  }

  confirmDelete(video: any) {
    this.selectVideo = video;
    this.deleteDialog = true;
  }

  obtenerTabla(): void {
    if (this.tablaB) {
      this.tablaB.first = 0;
      this.tablaB.rows = 10;
      this.tablaB.firstChange.emit(this.tablaB.first);
      this.mPaginacion(this.tablaB.createLazyLoadMetadata());
    }
  }

  mPaginacion(e: any): void{
    if (e.rows){
      this.params.max = e.rows;
    }
    if(e.first){
      this.params.offset = e.first;
          }
          else{
            this.params.offset=0;
          }
          if (e.multiSortMeta) {
            this.params.sort = e.multiSortMeta;
          }
          this.obtenerDatosTabla();

  }

  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
  }


  delete() {
    if (this.selectVideo) {
      this.videoService.delete(this.selectVideo.id).subscribe({
        next: (response) => {
          this.message = 'Video eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el video.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }

  getYouTubeThumbnail(url: string): string {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : '';
}


}
