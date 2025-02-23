import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Tecnica } from './Tecnica'; // Asegúrate de que la ruta sea la correcta
import { TecnicaService } from './tecnicas.service';

@Component({
  selector: 'app-tecnica-form',
  templateUrl: './tecnica-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  styleUrls: ['./tecnica-form.component.css']
})
export class TecnicaFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
  @Output() tecnicaChange: EventEmitter<Tecnica> = new EventEmitter<Tecnica>();
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  // Variable privada para almacenar la técnica
  private _tecnica!: Tecnica;

  // Setter para la entrada "tecnica"
  @Input() set tecnica(tecnica: Tecnica) {
    // En lugar de usar "new Tecnica()", creamos un objeto literal con valores por defecto
    this._tecnica = { id: 0, nombre: '', descripcion: '' };
    if (tecnica && tecnica.id) {
      this.tecnicaService.get(tecnica.id).subscribe({
        next: (tecnicaDataServer: Tecnica) => {
          this._tecnica = tecnicaDataServer;
        }
      });
    }
  }

  get tecnica(): Tecnica {
    return this._tecnica;
  }

  constructor(private tecnicaService: TecnicaService) { }

  ngOnInit() { }

  save(): void {
    if (this.tecnica.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create(): void {
    this.tecnicaService.save(this.tecnica).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Técnica guardada exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.tecnicaChange.emit(this.tecnica);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar la técnica.';
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
    this.tecnicaService.update(this.tecnica).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Técnica actualizada exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.tecnicaChange.emit(this.tecnica);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar la técnica.';
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
