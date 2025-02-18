import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaObraService } from './categoria-obra.service';
import { CategoriaObra } from './CategoriaObra';

@Component({
  selector: 'app-categoria-obra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-obra.component.html',
  styleUrls: ['./categoria-obra.component.css'],
})
export class CategoriaObraComponent implements OnInit {
  categorias: CategoriaObra[] = [];
  categoriaForm: FormGroup;
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private categoriaObraService: CategoriaObraService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef // 👈 Se usa para forzar actualización si es necesario
  ) {
    // Inicializar formulario reactivo
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.cargando = true; // Mostrar loading
    this.categoriaObraService.listarCategorias().subscribe({
      next: (data) => {
        console.log('Categorías obtenidas:', data); // 🛠️ Verificación en consola
        this.categorias = data;
        this.cargando = false;
        this.cdr.detectChanges(); // 👈 Forzar actualización si Angular no la hace
      },
      error: (err) => {
        console.error('Error al listar categorías:', err);
        this.mensaje = 'Error al cargar las categorías.';
        this.cargando = false;
      },
    });
  }

  crearCategoria(): void {
    if (this.categoriaForm.valid) {
      const nuevaCategoria: CategoriaObra = this.categoriaForm.value;
      this.categoriaObraService.crearCategoria(nuevaCategoria).subscribe({
        next: (data: any) => {
          this.mensaje = `✅ ¡Categoría "${data.nombre}" creada con éxito!`;
          this.categoriaForm.reset(); // Limpiar formulario
          this.listarCategorias(); // Actualizar la lista
        },
        error: (err) => {
          console.error('Error al crear la categoría:', err);
          this.mensaje = '❌ Ocurrió un error al crear la categoría.';
        },
      });
    }
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.categoriaObraService.eliminarCategoria(id).subscribe({
        next: () => {
          this.mensaje = '✅ Categoría eliminada con éxito.';
          this.listarCategorias(); // Actualizar la lista
        },
        error: (err) => {
          console.error('Error al eliminar la categoría:', err);
          this.mensaje = '❌ Error al eliminar la categoría.';
        },
      });
    }
  }
}
