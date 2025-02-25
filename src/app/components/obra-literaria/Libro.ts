import { Autor } from "../autor/Autor";
import { CategoriaLibro } from "../categoria-libro/CategoriaLibro";

export class Libro{
  id?:number;
  titulo?:string;
  descripcion?:string;
  isbn?:string;
  editorial?:string;
  edicion?:number;
  lugar?:string;
  numeroPaginas?:number;
  cantidadEjemplares?:number;
  anio?:number;
  idioma?:string;
  clasificacion?:string;
  categoria?:CategoriaLibro;
  observacion?:string;
  fechaCreacion?:Date;
  activo?:boolean;
autores?:Autor[];
imagenes?:string;

}
