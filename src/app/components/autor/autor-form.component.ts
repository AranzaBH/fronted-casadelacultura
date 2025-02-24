import { Component, OnInit, Output, ViewChild,EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Autor } from './Autor';
import { AutorService } from './autor.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  styleUrls:['./autor-form.component.css'],
  templateUrl: './autor-form.component.html',
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

export class AutorFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
    @Output() autorChange: EventEmitter<Autor> = new EventEmitter<Autor>();
    message: string = '';
    messageType: 'success' | 'error' | '' = '';
    _autor!: Autor;
    tipos: string[] = ['PICTORICA', 'LITERARIA', 'FONOTECA'];

    @Input() set autor(autor: Autor) {
        this._autor = new Autor();
        if (autor && autor.id) {
          this.autorService.get(autor.id).subscribe(
            {
              next: (autorDataServer: Autor) => {
                this._autor = autorDataServer;
              }
            }
          )
        }
      }



  constructor(private autorService:AutorService) { }

  get autor(){
    return this._autor;
  }
  ngOnInit() { }

  save():void{
    if(this.autor.id){
      this.update();
    }else{
      this.create();

    }
  }

  create():void{
    this.autorService.save(this.autor).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Autor guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.autorChange.emit(this.autor);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el autor.';
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
    this.autorService.update(this.autor).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Autor de obra actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.autorChange.emit(this.autor);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el autor.';
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
