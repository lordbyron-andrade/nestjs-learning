import { Injectable } from '@nestjs/common';
import { Tarea, StatusTarea } from './tareas.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TareasService {
  private tareas: Tarea[] = [];

  getAllTareas(): Tarea[] {
    return this.tareas;
  }

  crearTarea(titulo: string, descripcion: string): Tarea {
    const tx: Tarea = {
      id: uuid(),
      titulo,
      descripcion,
      status: StatusTarea.ABIERTA,
    };

    this.tareas.push(tx);
    return tx;
  }
}
