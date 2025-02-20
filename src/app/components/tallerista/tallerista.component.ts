import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tallerista',
  imports: [],
  templateUrl: './tallerista.component.html',
  styleUrl: './tallerista.component.css'
})
export class TalleristaComponent {
  constructor(private router: Router) { }

  // Método para redirigir a la ruta "tipo-taller"
  goToTipoTaller(): void {
    this.router.navigate(['/tipo-taller']);
    this.router.navigate(['/crear-taller']);
  }

}
