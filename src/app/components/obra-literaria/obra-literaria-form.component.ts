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
import { Libro } from './Libro';
import { Autor } from '../autor/Autor';
import { CategoriaLibro } from '../categoria-libro/CategoriaLibro';
import { LibroService } from './obra-literaria.service';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  templateUrl: './obra-literaria-form.component.html',
  styleUrls: ['./obra-literaria-form.component.css'],
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
export class LibroFormComponent implements OnInit {
  @ViewChild('formulario') formulario: any;
  @Output() libroChange: EventEmitter<Libro> = new EventEmitter<Libro>();
  message: string = '';
  previewModalActive: boolean = false;
  previewModalSrc: string = '';
  messageType: 'success' | 'error' | '' = '';
  _libro!: Libro;
  selectedFile:any;
  autores: Autor[] = [];
  categorias: CategoriaLibro[] = [];
  selectedAutores: Autor[] = [];
  uploadedFiles: any[] = [];
  previewImages: string[] = [];
  idiomas: string[] = ['Español','Inglés','Francés','Alemán','Italiano','Portugués','Otro'];

  @Input() set libro(libro: Libro) {
    this._libro = new Libro();
    if (libro && libro.id) {
      this.libroService.getLibro(libro.id).subscribe({
        next: (response:any) => {
            console.log("response",response);
            this._libro = response.libro;
            console.log("libro",this._libro)
            this.selectedAutores = response.autores;
            this._libro.categoriaLibro = this.categorias.find(
              cat => cat.id === response.libro.categoriaLibro.id
            ) || response.libro.categoriaLibro;
        }
    });
    }
    this.selectedAutores= [];
    this.selectedFile = null;
    this._libro.urlImagenPortada = '';
  }
  
  constructor(
    private libroService: LibroService,
    private autorService: AutorService,
    private categoriaService: CategoriaLibroService
  ) {}

  get libro() {
    return this._libro;
  }

  ngOnInit() {
    this.loadAutores();
    this.loadCategorias();
  }

  loadAutores() {
    this.autorService.listarLiteraria().subscribe({
       next: (data: Autor[]) => {
         this.autores = data;
       }
    });
  }

  loadCategorias(){
    this.categoriaService.listarTodas().subscribe({
      next: (data: CategoriaLibro[]) => {
        this.categorias = data;
      }
    });
  }

  async save() {
    this._libro.autores = this.selectedAutores;
    if (this._libro.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const formData = new FormData();
    formData.append("libro", JSON.stringify(this._libro));
    if (this.selectedFile) {
      formData.append("archivo", this.selectedFile);
    }
    console.log("esto envio",this._libro);
    console.log("esto obra",this.selectedFile);
    this.libroService.crearLibro(formData).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = "Libro guardado exitosamente";
          this.messageType = "success";
  
          setTimeout(() => {
            this.libroChange.emit(this._libro);
            this.message = "";
            this.messageType = "";
          }, 1500);
        } else {
          this.message = data.message || "Hubo un problema al guardar el libro.";
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
    formData.append("libro", JSON.stringify(this._libro));
  
    if (this.selectedFile) {
      formData.append("archivo", this.selectedFile);
    }
  
    console.log("📤 Enviando actualización:", this._libro);
  
    this.libroService.update(this._libro.id, formData).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.message = "Libro actualizado exitosamente";
          this.messageType = "success";
  
          setTimeout(() => {
            this.libroChange.emit(this._libro);
            this.message = "";
            this.messageType = "";
          }, 1500);
        } else {
          this.message = data.message || "Hubo un problema al actualizar el libro.";
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
    
    if (this._libro.urlImagenPortada) {
      
      this._libro.urlImagenPortada = '';
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