import { Autor } from "../autor/Autor";
import { CategoriaObra } from "../categoria-obra/CategoriaObra";
import { Tecnica } from "../tecnicas/Tecnica";

export class ObraPictorica{
  id?:number;
    titulo?:string;
    tituloOriginal?:string;
    codigo?:string;
    descripcion?:string;
    dimension?:string;
    localizacion?:string;
    anioObra?:number;
    tecnica?:Tecnica;
    categoriaObra?:CategoriaObra;
    fechaCreacion?:Date;
    activo?:boolean;
  autores?:Autor[];
  imagenes?:string[];
  urlImagenPortada?:string;

}
