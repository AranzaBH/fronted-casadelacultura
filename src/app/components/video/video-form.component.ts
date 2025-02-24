import { Component, OnInit, Output, ViewChild,EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Video } from './Video';
import { VideoService } from './video.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls:['./video-form.component.css'],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ButtonModule,
      InputTextModule,
      DialogModule
    ],
    animations: [
        trigger('fadeSlide', [
          transition(':enter', [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ]),
          transition(':leave', [
            animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
          ])
        ])
      ]
})

export class VideoFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
    @Output() videoChange: EventEmitter<Video> = new EventEmitter<Video>();
    message: string = '';
    messageType: 'success' | 'error' | '' = '';
    _video!: Video;

    @Input() set video(video: Video) {
        this._video = new Video();
        if (video && video.id) {
          this.videoService.get(video.id).subscribe(
            {
              next: (videoDataServer: Video) => {
                this._video = videoDataServer;
              }
            }
          )
        }
      }



  constructor(private videoService:VideoService) { }

  get video(){
    return this._video;
  }
  ngOnInit() { }

  save():void{
    if(this.video.id){
      this.update();
    }else{
      this.create();

    }
  }

  create():void{
    this.videoService.save(this.video).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Video guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.videoChange.emit(this.video);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el video.';
          this.messageType = 'error';
        }
      },
      error: () => {
        this.message = 'Hubo un problema al comunicar con el servidor.';
        this.messageType = 'error';
      }
    })
  }


  update(): void {
    this.videoService.update(this.video).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Video  actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.videoChange.emit(this.video);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el video.';
          this.messageType = 'error';
        }
      },
      error: () => {
        this.message = 'Hubo un problema al comunicar con el servidor.';
        this.messageType = 'error';
      }
    });
  }

}
