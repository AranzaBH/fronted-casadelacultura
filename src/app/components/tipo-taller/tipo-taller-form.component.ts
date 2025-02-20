import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { TipoTaller } from './TipoTaller';
import { TipoTallerService } from './tipo-taller.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tipo-taller-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  templateUrl: './tipo-taller-form.component.html',
  styleUrls: ['./tipo-taller-form.component.css']
})

export class TipoTallerFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
  @Output() tipoTallerChange: EventEmitter<TipoTaller> = new EventEmitter<TipoTaller>();
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  @Input() set tipoTaller(tipoTaller: TipoTaller) {
    this._tipoTaller = new TipoTaller();
    if (tipoTaller && tipoTaller.id) {
      this.tipoTallerService.get(tipoTaller.id).subscribe(
        {
          next: (tipoTDataServer: TipoTaller) => {
            this._tipoTaller = tipoTDataServer;
          }
        }
      )
    }

  }



  _tipoTaller!: TipoTaller;
  constructor(private tipoTallerService: TipoTallerService, private messageService: MessageService) { }


  get tipoTaller() {
    return this._tipoTaller;
  }

  ngOnInit() { }

  save(): void {
    if (this.tipoTaller.id) {
      this.update();
    } else {
      this.create();
    }



  }



  create(): void {
    this.tipoTallerService.save(this.tipoTaller).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Taller guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.tipoTallerChange.emit(this.tipoTaller);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el taller.';
          this.messageType = 'error';
        }
      },
      error: () => {
        this.message = 'Hubo un problema al comunicar con el servidor.';
        this.messageType = 'error';
      }
    });
  }

  update(): void {
    this.tipoTallerService.update(this.tipoTaller).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Taller actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.tipoTallerChange.emit(this.tipoTaller);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el taller.';
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