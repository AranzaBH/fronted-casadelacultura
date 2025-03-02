import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroService } from './obra-literaria.service';
import { Libro } from './Libro';
import { Autor } from '../autor/Autor';
import { CategoriaLibro } from '../categoria-libro/CategoriaLibro';
import { CategoriaLibroService } from '../categoria-libro/categoria-libro.service';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-obra-literaria-show',
    templateUrl: './obra-literaria-show.component.html',
    styleUrls: ['./obra-literaria-show.component.css'],
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class ObraLiterariaShowComponent implements OnInit {
    _libro!: Libro;
    selectedAutores: Autor[] = [];
    categorias: CategoriaLibro[] = [];
    
    previewModalActive: boolean = false;
    previewModalSrc: string = '';

    @Input() set libro(libro: Libro) {
        this._libro = new Libro();
        if (libro && libro.id) {
            this.libroService.getLibro(libro.id).subscribe({
                next: (response: any) => {
                    console.log("response", response);
                    this._libro = response.libro;
                    this.selectedAutores = response.autores;
                    
                    // Asegurarse de que la categoría esté correctamente asignada
                    if (response.libro.categoriaLibro) {
                        this._libro.categoriaLibro = this.categorias.find(
                            cat => cat.id === response.libro.categoriaLibro.id
                        ) || response.libro.categoriaLibro;
                    }
                }
            });
        }
    }

    constructor(
        private libroService: LibroService,
        private categoriaService: CategoriaLibroService,
        private location: Location
    ) { }

    get libro() {
        return this._libro;
    }

    ngOnInit() {
        this.loadCategorias();
    }

    loadCategorias() {
        this.categoriaService.listarTodas().subscribe({
            next: (data: CategoriaLibro[]) => {
                this.categorias = data;
            
            }
        });
    }
    openImagePreview(src: string) {
        this.previewModalSrc = src;
        this.previewModalActive = true;
        
        document.body.style.overflow = 'hidden';
    }
    
    closeImagePreview() {
        this.previewModalActive = false;
        this.previewModalSrc = '';
        
        document.body.style.overflow = '';
    }
    
    goBack() {
        this.location.back();
    }
}