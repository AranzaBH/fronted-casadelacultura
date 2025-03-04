import { Autor } from "../autor/Autor";
import { Estilos } from "../estilos/Estilos";

export class ObraFonografica{
  id?:number;
      titulo?:string;//
      lugar?:string;//
      anio?:number;//
      estilo?:Estilos;//
      origen?:string;//
      fecha?:string;//
      clasificacion?:string;//
      ubicacion?:string;//
      observaciones?:string;//
      cantidad?:number;//
      fechaCreacion?:Date;
      activo?:boolean;
    autores?:Autor[];//
    imagenes?:string[];
    urlImagenPortada?:string;//
}
