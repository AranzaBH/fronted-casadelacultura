import { Component, OnInit, Output, ViewChild,EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaObra } from './CategoriaObra';
import { CategoriaObraService } from './categoria-obra.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-categoria-obra-form',
  templateUrl: './categoria-obra-form.component.html',
  styleUrls:['./categoria-obra-form.component.css'],
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

export class CategoriaObraFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
    @Output() categoriaObraChange: EventEmitter<CategoriaObra> = new EventEmitter<CategoriaObra>();
    message: string = '';
    messageType: 'success' | 'error' | '' = '';
    _categoriaObra!: CategoriaObra;

    @Input() set categoriaObra(categoriaObra: CategoriaObra) {
        this._categoriaObra = new CategoriaObra();
        if (categoriaObra && categoriaObra.id) {
          this.categoriaObraService.get(categoriaObra.id).subscribe(
            {
              next: (categoriaDataServer: CategoriaObra) => {
                this._categoriaObra = categoriaDataServer;
              }
            }
          )
        }
      }



  constructor(private categoriaObraService:CategoriaObraService) { }

  get categoriaObra(){
    return this._categoriaObra;
  }
  ngOnInit() { }

  save():void{
    if(this.categoriaObra.id){
      this.update();
    }else{
      this.create();

    }
  }

  create():void{
    this.categoriaObraService.save(this.categoriaObra).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Categoría obra guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.categoriaObraChange.emit(this.categoriaObra);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el categoría.';
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
    this.categoriaObraService.update(this.categoriaObra).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Categoría de obra actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.categoriaObraChange.emit(this.categoriaObra);
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
