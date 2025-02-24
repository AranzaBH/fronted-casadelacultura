import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario } from './Usuario';
import { UserService } from './user.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from './usuario.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-usuario-formu',
  templateUrl: './usuario-formu.component.html',
  styleUrls:['./usuario-formu.component.css'],
   standalone: true,
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

export class UsuarioFormuComponent implements OnInit {
 @ViewChild('formulario') formulario: any;
 roles: string[] = ['ADMINISTRADOR', 'TALLERISTA', 'GALERISTA'];
  @Output() usuarioChange: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  @Input() set usuario(usuario: Usuario) {
    console.log("recibo esto",usuario)
    this._usuario = new Usuario();
    if (usuario && usuario.id) {
      this.userService.get(usuario.id).subscribe(
        {
          next: (usuarioDataServer: Usuario) => {
            console.log("recibo esto",usuarioDataServer)
            this._usuario = usuarioDataServer;
          }
        }
      )
    }

  }

  _usuario!: Usuario;
  constructor(private userService: UsuarioService, private messageService: MessageService) { }


  get usuario() {
    return this._usuario;
  }

  ngOnInit() { }

  save(): void {
    if (this.usuario.id) {
      this.update();
    } else {
      this.create();
    }



  }



  create(): void {
    this.userService.save(this.usuario).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = 'Usuario guardado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.usuarioChange.emit(this.usuario);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al guardar el usuario.';
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
    this.userService.update(this.usuario).subscribe({
      next: (data: any) => {
        console.log("this se obtiene",data)
        if (data.success) {
          this.message = 'Usuario actualizado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.usuarioChange.emit(this.usuario);
            this.message = '';
            this.messageType = '';
          }, 1500);
        } else {
          this.message = data.message || 'Hubo un problema al actualizar el usuario.';
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
