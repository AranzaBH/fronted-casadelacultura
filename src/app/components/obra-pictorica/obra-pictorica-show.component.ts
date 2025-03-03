import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autor } from '../autor/Autor';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ObraPictorica } from './ObraPictorica';
import { CategoriaObra } from '../categoria-obra/CategoriaObra';
import { ObraPictoricaService } from './obra-pictorica.service';
import { CategoriaObraService } from '../categoria-obra/categoria-obra.service';
import { Material } from '../materiales/Material';

@Component({
    selector: 'app-obra-pictorica-show',
    templateUrl: './obra-pictorica-show.component.html',
    styleUrls:['./obra-pictorica-show.component.css'],
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
export class ObraPictoricaShowComponent  implements OnInit {
    _obra!: ObraPictorica;
    selectedAutores: Autor[] = [];
    selectedMateriales: Material[] = [];
    categorias: CategoriaObra[] = [];
    
    previewModalActive: boolean = false;
    previewModalSrc: string = '';

    @Input() set obra(obra: ObraPictorica) {
        this._obra = new ObraPictorica();
        if (obra && obra.id) {
            this.obraService.getObra(obra.id).subscribe({
                next: (response: any) => {
                    console.log("response", response);
                    this._obra = response.obra;
                    this.selectedAutores = response.autores;
                    this.selectedMateriales = response.materiales;
                    
                    // Asegurarse de que la categoría esté correctamente asignada
                    if (response.obra.categoriaObra) {
                        this._obra.categoriaObra = this.categorias.find(
                            cat => cat.id === response.obra.categoriaObra.id
                        ) || response.obra.categoriaObra;
                    }
                }
            });
        }
    }

    constructor(
        private obraService: ObraPictoricaService,
        private categoriaService: CategoriaObraService,
        private location: Location
    ) { }

    get obra() {
        return this._obra;
    }

    ngOnInit() {
        this.loadCategorias();
    }

    loadCategorias() {
        this.categoriaService.listarCategorias().subscribe({
            next: (data: CategoriaObra[]) => {
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