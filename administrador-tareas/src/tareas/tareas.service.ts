import { Injectable } from '@nestjs/common';
import { Tarea, StatusTarea } from './tareas.model';
import { v4 as uuid } from 'uuid';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { GetTareasFiltroDto } from './dto/get-tareas-filtro.dto';

@Injectable()
export class TareasService {
  private tareas: Tarea[] = [];

  getAllTareas(): Tarea[] {
    return this.tareas;
  }

  getTareasConFiltro(filtroDto: GetTareasFiltroDto): Tarea[] {
    //Esta es una descomposición de objetos como rn JavaScript
    const { status, search } = filtroDto;

    //Obtenemos las tareas para filtrarlas
    let txs = this.getAllTareas();

    if (status) {
      console.log(status);
      txs = txs.filter((tx) => tx.status === status);
    }

    if (search) {
      txs = txs.filter((tx) => {
        if (tx.titulo.includes(search) || tx.descripcion.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return txs;
  }

  getTareaByID(id: string): Tarea {
    /*Se utiliza en método fin de las colecciones, el cual itera sobre la colección hasta encontrar una coincidencia, es importante mencionar 
    que el lambda utilizado si se encierra entre llaves requiere de un return y si no y solo es una sola linea el resultado generado por la instrucción 
    es inmediatamente regresado*/
    return this.tareas.find((tx) => tx.id === id);
  }

  crearTarea(crearTareaDto: CrearTareaDto): Tarea {
    const { titulo, descripcion } = crearTareaDto;
    const tx: Tarea = {
      id: uuid(),
      titulo,
      descripcion,
      status: StatusTarea.ABIERTA,
    };

    this.tareas.push(tx);
    return tx;
  }

  borrarTarea(id: string): void {
    /* Este método va servir para eliminar un elemento que coincida con el id enviado, estamos tilizando un método de las colecciones denominado 
       filter por medio del cual generamos un arrreglo de resultado que no contiene el elemento a eliminar*/
    this.tareas = this.tareas.filter((tx) => tx.id != id);
  }

  updateStatusTarea(id: string, status: StatusTarea) {
    const tx = this.getTareaByID(id);
    tx.status = status;
    return tx;
  }
}
