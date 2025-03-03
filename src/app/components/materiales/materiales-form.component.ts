import { Component, OnInit, Output, ViewChild,EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { trigger, transition, style, animate } from '@angular/animations';
import { Material } from './Material';
import { MaterialService } from './material.service';
@Component({
  selector: 'app-materiales-form',
  templateUrl: './materiales-form.component.html',
  styleUrls:['./materiales-form.component.css'],
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

export class MaterialesFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
    @Output() materialChange: EventEmitter<Material> = new EventEmitter<Material>();
    message: string = '';
    messageType: 'success' | 'error' | '' = '';
    _material!: Material;

    @Input() set material(material: Material) {
        this._material = new Material();
        if (material && material.id) {
          this.materialService.get(material.id).subscribe(
            {
              next: (materialDataServer: Material) => {
                this._material = materialDataServer;
              }
            }
          )
        }
      }



  constructor(private materialService:MaterialService) { }

  get material(){
    return this._material;
  }
  ngOnInit() { }

  save():void{
    if(this.material.id){
      this.update();
    }else{
      this.create();

    }
  }

  create():void{
    this.materialService.save(this.material).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Material guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.materialChange.emit(this.material);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el material.';
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
    this.materialService.update(this.material).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Material actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.materialChange.emit(this.material);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el material.';
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
