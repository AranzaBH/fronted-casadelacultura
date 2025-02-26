export class Actividad {
  id?:number;
  nombre!: string;
  video?: { id: number };
  cuestionario?: { idCuestionario: number } ;
  taller!: { id: number };
  modulo?: number;
  avance?: number;
  estatus?: boolean;
}