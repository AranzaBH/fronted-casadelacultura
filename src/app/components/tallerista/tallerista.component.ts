import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tallerista',
  templateUrl: './tallerista.component.html',
  styleUrls: ['./tallerista.component.css']
})
export class TalleristaComponent {
  constructor(private router: Router) { }

  // Método para redirigir a la ruta "tipo-taller"
// En tu componente .ts
goToTipoTaller(): void {
  this.router.navigate(['/tipo-taller']);
}

goToCrearTaller(): void {
  this.router.navigate(['/crear-taller']);
}

goToVerTaller(): void {
  this.router.navigate(['/ver-taller']);
}


}
