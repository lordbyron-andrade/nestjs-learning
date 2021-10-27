export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  status: StatusTarea;
}

export enum StatusTarea {
  ABIERTA = 'ABIERTA',
  EN_PROGRESO = 'EN_PROGRESO',
  TERMINADA = 'TERMINADA',
}
