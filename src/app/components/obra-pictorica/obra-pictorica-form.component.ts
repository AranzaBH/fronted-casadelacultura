

import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { AutorService } from '../autor/autor.service';
import { CategoriaLibroService } from '../categoria-libro/categoria-libro.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Autor } from '../autor/Autor';
import { ObraPictorica } from './ObraPictorica';
import { CategoriaObra } from '../categoria-obra/CategoriaObra';
import { Tecnica } from '../tecnicas/Tecnica';
import { ObraPictoricaService } from './obra-pictorica.service';
import { CategoriaObraService } from '../categoria-obra/categoria-obra.service';
import { TecnicaService } from '../tecnicas/tecnicas.service';

@Component({
    selector: 'app-obra-pictorica-form',
    templateUrl: './obra-pictorica-form.component.html',
    styleUrls:['./obra-pictorica-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    FileUploadModule,
    DialogModule,
    CalendarModule
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
export class ObraPictoricaFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
  @Output() obraChange: EventEmitter<ObraPictorica> = new EventEmitter<ObraPictorica>();
  message: string = '';
  previewModalActive: boolean = false;
  previewModalSrc: string = '';
  messageType: 'success' | 'error' | '' = '';
  _obra!: ObraPictorica;
  selectedFile:any;
  autores: Autor[] = [];
  categorias: CategoriaObra[] = [];
  tecnicas: Tecnica[] = [];
  selectedAutores: Autor[] = [];
  uploadedFiles: any[] = [];
  previewImages: string[] = [];
  idiomas: string[] = ['Español','Inglés','Francés','Alemán','Italiano','Portugués','Otro'];

  @Input() set obra(obra: ObraPictorica) {
    this._obra = new ObraPictorica();
    if (obra && obra.id) {
      this.obraService.getObra(obra.id).subscribe({
        next: (response:any) => {
            console.log("response",response);
            this._obra = response.obra;
            console.log("obra",this._obra)
            this.selectedAutores = response.autores;
            this._obra.categoriaObra = this.categorias.find(
              cat => cat.id === response.obra.categoriaObra.id
            ) || response.obra.categoriaObra;

            this._obra.tecnica = this.tecnicas.find(
                cat => cat.id === response.obra.tecnica.id
              ) || response.obra.tecnica;
        }
    });
    }
    this.selectedAutores= [];
    this.selectedFile = null;
    this._obra.urlImagenPortada = '';
  }
  
  constructor(
    private autorService: AutorService,
    private obraService:ObraPictoricaService,
    private categoriaService:CategoriaObraService,
    private tecnicaService:TecnicaService
  ) {}

  get obra() {
    return this._obra;
  }

  ngOnInit() {
    this.loadAutores();
    this.loadCategorias();
    this.loadTecnicas();
  }

  loadAutores() {
    this.autorService.listarLiteraria().subscribe({
       next: (data: Autor[]) => {
         this.autores = data;
       }
    });
  }

  loadCategorias(){
    this.categoriaService.listarCategorias().subscribe({
      next: (data: CategoriaObra[]) => {
        this.categorias = data;
      }
    });
  }

  loadTecnicas(){
    this.tecnicaService.listarTecnicas().subscribe({
      next: (data: Tecnica[]) => {
        this.tecnicas = data;
      }
    });
  }

  async save() {
    this._obra.autores = this.selectedAutores;
    if (this._obra.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const formData = new FormData();
    formData.append("obra", JSON.stringify(this._obra));
    if (this.selectedFile) {
      formData.append("archivo", this.selectedFile);
    }
    console.log("esto envio",this._obra);
    console.log("esto archivo",this.selectedFile);
    this.obraService.crearObra(formData).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = "Obra guardada exitosamente";
          this.messageType = "success";
  
          setTimeout(() => {
            this.obraChange.emit(this._obra);
            this.message = "";
            this.messageType = "";
          }, 1500);
        } else {
          this.message = data.message || "Hubo un problema al guardar la obra.";
          this.messageType = "error";
        }
      },
      error: () => {
        this.message = "Hubo un problema al comunicar con el servidor.";
        this.messageType = "error";
      }
    });
  }

  update() {
    const formData = new FormData();
    formData.append("libro", JSON.stringify(this._obra));
  
    if (this.selectedFile) {
      formData.append("archivo", this.selectedFile);
    }
  
    this.obraService.update(this._obra.id, formData).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = "Obra actualizada exitosamente";
          this.messageType = "success";
  
          setTimeout(() => {
            this.obraChange.emit(this._obra);
            this.message = "";
            this.messageType = "";
          }, 1500);
        } else {
          this.message = data.message || "Hubo un problema al actualizar la obra.";
          this.messageType = "error";
        }
      },
      error: () => {
        this.message = "Hubo un problema al comunicar con el servidor.";
        this.messageType = "error";
      }
    });
  }
  

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        this.message = 'Por favor, seleccione un archivo de imagen válido.';
        this.messageType = 'error';
        return;
      }
      
      if (file.size > 3 * 1024 * 1024) {
        this.message = 'La imagen no debe exceder los 5MB.';
        this.messageType = 'error';
        return;
      }
      
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages = [e.target.result];
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewImages = [];
    this.selectedFile = null;
    
    if (this._obra.urlImagenPortada) {
      
      this._obra.urlImagenPortada = '';
    }
  }
  
  openImagePreview(src: any) {
    this.previewModalSrc = src;
    this.previewModalActive = true;
    document.body.style.overflow = 'hidden';
  }

  closeImagePreview() {
    this.previewModalActive = false;
    this.previewModalSrc = '';
    
    document.body.style.overflow = '';
  }
}