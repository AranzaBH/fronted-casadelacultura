import { DialogModule } from 'primeng/dialog';

import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { CategoriaLibro } from './CategoriaLibro';
import { CategoriaLibroService } from './categoria-libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-categoria-libro-form',
  templateUrl: './categoria-libro-form.component.html',
  styleUrls:['./categoria-libro-form.component.css'],
imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [MessageService],
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

export class CategoriaLibroFormComponent implements OnInit {
   @ViewChild('formulario') formulario: any;
  @Output() categoriaChange: EventEmitter<CategoriaLibro> = new EventEmitter<CategoriaLibro>();
    message: string = '';
    messageType: 'success' | 'error' | '' = '';

    @Input() set categoria(categoriaL: CategoriaLibro) {
      this._categoria = new CategoriaLibro();
      if (categoriaL && categoriaL.id) {
        this.categoriaService.get(categoriaL.id).subscribe(
          {
            next: (categoriaDataServer: CategoriaLibro) => {
              this._categoria = categoriaDataServer;
            }
          }
        )
      }

    }



    _categoria!: CategoriaLibro;
    constructor(private categoriaService: CategoriaLibroService, private messageService: MessageService) { }


    get categoria() {
      return this._categoria;
    }

    ngOnInit() { }

    save(): void {
      if (this.categoria.id) {
        this.update();
      } else {
        this.create();
      }
    }

    create(): void {
      console.log("esto se envia",this.categoria)
      this.categoriaService.save(this.categoria).subscribe({
        next: (data: any) => {
          if (data.success) {
            this.message = 'Categoría guardada exitosamente';
            this.messageType = 'success';

            setTimeout(() => {
              this.categoriaChange.emit(this.categoria);
              this.message = '';
              this.messageType = '';
            }, 1500);
          } else {
            this.message = data.message || 'Hubo un problema al guardar la categoría.';
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
      this.categoriaService.update(this.categoria).subscribe({
        next: (data: any) => {
          if (data.success) {
            this.message = 'Categoría actualizada exitosamente';
            this.messageType = 'success';

            setTimeout(() => {
              this.categoriaChange.emit(this.categoria);
              this.message = '';
              this.messageType = '';
            }, 1500);
          } else {
            this.message = data.message || 'Hubo un problema al actualizar la categoría.';
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

