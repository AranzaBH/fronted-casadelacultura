import { Component, OnInit, Output, ViewChild,EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { trigger, transition, style, animate } from '@angular/animations';
import { Estilos } from './Estilos';
import { EstilosService } from './estilos.service';
@Component({
  selector: 'app-estilos-form',
  templateUrl: './estilos-form.component.html',
  styleUrls:['./estilos-form.component.css'],
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

export class EstilosFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
    @Output() estiloChange: EventEmitter<Estilos> = new EventEmitter<Estilos>();
    message: string = '';
    messageType: 'success' | 'error' | '' = '';
    _estilo!: Estilos;

    @Input() set estilo(estilo: Estilos) {
        this._estilo = new Estilos();
        if (estilo && estilo.id) {
          this.estiloService.get(estilo.id).subscribe(
            {
              next: (estiloDataServer: Estilos) => {
                this._estilo = estiloDataServer;
              }
            }
          )
        }
      }



  constructor(private estiloService:EstilosService) { }

  get estilo(){
    return this._estilo;
  }
  ngOnInit() { }

  save():void{
    if(this.estilo.id){
      this.update();
    }else{
      this.create();

    }
  }

  create():void{
    this.estiloService.save(this.estilo).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Estilo guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.estiloChange.emit(this.estilo);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el estilo.';
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
    this.estiloService.update(this.estilo).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Estilo actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.estiloChange.emit(this.estilo);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el estilo.';
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
