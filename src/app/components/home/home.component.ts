import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in">
      <h1 class="section-title">Bienvenidos a la Casa de la Cultura Oaxaqueña</h1>
      
      <div class="card cultural-pattern">
        <h2>Exposición Actual</h2>
        <p>Sumérgete en nuestra extraordinaria colección de arte tradicional oaxaqueño, donde cada pieza cuenta una historia única de nuestra rica herencia cultural. Desde textiles tradicionales hasta arte contemporáneo, nuestra exposición actual celebra la diversidad artística de Oaxaca.</p>
        <p>Descubre las obras de artistas locales que mantienen viva nuestra tradición mientras exploran nuevas formas de expresión artística.</p>
      </div>

      <div class="card cultural-pattern">
        <h2>Próximos Eventos</h2>
        <p>Participa en nuestros eventos culturales que incluyen exposiciones temporales, talleres de arte tradicional, presentaciones de libros y conferencias sobre la historia y cultura oaxaqueña.</p>
        <p>Este mes presentamos talleres de tejido en telar de cintura, clases de alfarería tradicional y exposiciones de arte contemporáneo que fusionan lo tradicional con lo moderno.</p>
      </div>

      <div class="card cultural-pattern">
        <h2>Biblioteca</h2>
        <p>Explora nuestra extensa colección bibliográfica especializada en arte, historia y cultura oaxaqueña. Contamos con más de 5,000 volúmenes, incluyendo libros raros y documentos históricos que preservan el rico patrimonio cultural de nuestra región.</p>
        <p>Visita nuestra sala de lectura, un espacio tranquilo y acogedor donde podrás sumergirte en la rica historia de Oaxaca.</p>
      </div>
    </div>
  `
})
export class HomeComponent {}