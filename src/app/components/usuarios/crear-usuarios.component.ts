import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent {
  usuarioForm: FormGroup;
  roles: string[] = ['ADMINISTRADOR', 'TALLERISTA', 'GALERISTA'];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      apellidoMaterno: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  crearUsuario() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      this.userService.añadirUsuarioRol(usuario, usuario.rol).subscribe({
        next: () => {
          alert('Usuario creado exitosamente');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          alert('Hubo un error al crear el usuario');
        }
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}
