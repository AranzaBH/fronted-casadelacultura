import { Component } from '@angular/core';
import { CuestionarioService} from './cuestionario.service';
import { PreguntasService, Pregunta } from '../pregunta/preguntas.service';
import { RespuestasService, Respuesta } from '../respuesta/respuestas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Cuestionario } from './Cuestionario';

@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent {
  // Datos generales del cuestionario
  cuestionario: Cuestionario =new Cuestionario();

  // Estructura dinámica para preguntas y respuestas
  preguntas: {
    pregunta: string;
    respuestas: { respuesta: string; esCorrecta: boolean }[];
  }[] = [];

  errorMessage: string = '';

  constructor(
    private preguntasService: PreguntasService,
    private cuestionarioService: CuestionarioService,
    private location: Location,
    private respuestasService: RespuestasService

  ) {}

  // Crear una nueva pregunta con un array de respuestas vacío
  agregarPregunta() {
    this.preguntas.push({
      pregunta: '',
      respuestas: []
    });
  }

  // Eliminar una pregunta específica
  eliminarPregunta(index: number) {
    this.preguntas.splice(index, 1);
  }

  // Agregar una nueva respuesta a una pregunta específica
  agregarRespuesta(index: number) {
    this.preguntas[index].respuestas.push({
      respuesta: '',
      esCorrecta: false
    });
  }

  // Eliminar una respuesta específica de una pregunta
  eliminarRespuesta(preguntaIndex: number, respuestaIndex: number) {
    this.preguntas[preguntaIndex].respuestas.splice(respuestaIndex, 1);
  }

  // Guardar el cuestionario con preguntas y respuestas
  guardarCuestionario() {
    if (!this.cuestionario.nombreCuestionario || !this.cuestionario.instruccion) {
      this.errorMessage = 'Por favor, completa los campos del cuestionario.';
      return;
    }

    // Crear cuestionario
    this.cuestionarioService.createCuestionario(this.cuestionario).subscribe({
      next: (respuesta: any) => {
        const idCuestionario = respuesta.data.idCuestionario;

        // Crear preguntas y sus respuestas
        this.preguntas.forEach((pregunta) => {
          const nuevaPregunta: Pregunta = {
            pregunta: pregunta.pregunta,
            cuestionario: { idCuestionario },
            fechaCreacion: new Date()
          };

          this.preguntasService.crearPregunta(nuevaPregunta).subscribe({
            next: (respuestaPregunta: any) => {
              const idPregunta = respuestaPregunta.data.idPregunta;

              // Crear respuestas para la pregunta actual
              pregunta.respuestas.forEach((resp) => {
                const nuevaRespuesta: Respuesta = {
                  respuesta: resp.respuesta,
                  esCorrecta: resp.esCorrecta,
                  preguntas: { idPregunta },
                  fechaCreacion: new Date()
                };

                this.respuestasService.crearRespuesta(nuevaRespuesta).subscribe({
                  next: () => console.log('Respuesta guardada con éxito'),
                  error: (err) => console.error('Error al guardar respuesta:', err)
                });
              });
            },
            error: (err) => console.error('Error al guardar pregunta:', err)
          });
        });

        console.log('Cuestionario creado con éxito.');
        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al guardar el cuestionario:', err);
      }
    });
  }

  // Resetear el formulario
  resetFormulario() {
    this.cuestionario=new Cuestionario();
    //this.cuestionario = { idCuestionario: 0, nombreCuestionario: '', instruccion: '' };
    this.preguntas = [];
    this.errorMessage = '';
  }


  regresar(): void {
    this.location.back(); // Regresa a la vista anterior
  }

}
