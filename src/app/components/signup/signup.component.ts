import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from '../../services/auth/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // Objeto del formulario con los campos requeridos
  public user = {
    username: '',
    password: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void {}

  // Método para enviar el formulario
  formSubmit() {
    // Validación básica del campo 'username'
    if (this.user.username.trim() === '') {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Llamada al servicio para guardar el usuario
    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Usuario guardado',
          'Usuario registrado con éxito en el sistema',
          'success'
        );
        // Limpiar el formulario después de guardar
        this.user = {
          username: '',
          password: '',
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno:'',
          email: '',
          telefono: '',

        };
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire(
          'Ha ocurrido un error',
          'No se pudo registrar el usuario en el sistema',
          'error'
        );
      }
    );
  }
}
