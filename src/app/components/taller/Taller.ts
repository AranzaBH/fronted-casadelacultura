export class Taller {
    id?: number; // Puede ser opcional cuando no lo tengas al crear el taller
    titulo!: string;
    descripcion!: string;
    tipoTaller!: {
      id: number;
      nombre: string;
    };
    fechaInico!: string; // Formato 'yyyy-MM-dd'
    fechaFinal!: string; // Formato 'yyyy-MM-dd'
    clave!: string;
    imagenPath?: string; // Opcional
    urlImagenPortadaTaller?: string; // Opcional
  }