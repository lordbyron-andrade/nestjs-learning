import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusTarea } from './tareas.status.enum';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { GetTareasFiltroDto } from './dto/get-tareas-filtro.dto';
import { TareasRepository } from './tareas.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';

@Injectable()
export class TareasService {
  /**Esta es la segunda etapa estamos ligando las clases a la base de datos, elegimos el método del repositorio de clases por eso necesitamos
   * inyectar esta misma clase dentro de la del servicio, y esto lo podemos hacer mediante un método costructor
   */
  constructor(
    @InjectRepository(TareasRepository)
    private tareasRepository: TareasRepository,
  ) {}

  getTareas(filtroDto: GetTareasFiltroDto): Promise<Tarea[]> {
    return this.tareasRepository.getTareas(filtroDto);
  }
  //private tareas: Tarea[] = [];
  // getAllTareas(): Tarea[] {
  //   return this.tareas;
  // }
  // getTareasConFiltro(filtroDto: GetTareasFiltroDto): Tarea[] {
  //   //Esta es una descomposición de objetos como rn JavaScript
  //   const { status, search } = filtroDto;
  //   //Obtenemos las tareas para filtrarlas
  //   let txs = this.getAllTareas();
  //   if (status) {
  //     console.log(status);
  //     txs = txs.filter((tx) => tx.status === status);
  //   }
  //   if (search) {
  //     txs = txs.filter((tx) => {
  //       if (tx.titulo.includes(search) || tx.descripcion.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return txs;
  // }
  async getTareaByID(id: string): Promise<Tarea> {
    const tx = await this.tareasRepository.findOne(id);
    if (!tx) {
      throw new NotFoundException(`La tarea con id ${id} no fue encontrada`);
    }
    return tx;
  }
  //getTareaByID(id: string): Tarea {
  /*Se utiliza en método find de las colecciones, el cual itera sobre la colección hasta encontrar una coincidencia, es importante mencionar 
    que el lambda utilizado si se encierra entre llaves requiere de un return y si no y solo es una sola linea el resultado generado por la instrucción 
    es inmediatamente regresado*/
  /* return this.tareas.find((tx) => tx.id === id); Esta era la función originalmente una sola línea de código, se necesitan hacer cambios porque 
    aunque el sistema no encuentre la tarea regresa un código 200 Ok y eso no esta del todo bien porque debe registrar que no encontro lo que se 
    buscaba, o al menos indicarlo, es decir genericamente la función decí Ok no encontre nada, la vamos a cambiar para que diga Oh oh, no encontre nada */
  //const tx = this.tareas.find((tx) => tx.id === id);
  /* En JS y TS cuando la función no regresa nada se puede evaluar como false y si si contiene algo se puede evaluar como true, NestJS puede generar 
    excepciones de HTML y regresar eso como vemos en la instrucción después del false */
  //   if (!tx) {
  //     throw new NotFoundException();
  //   }
  //   return tx;
  // }
  // crearTarea(crearTareaDto: CrearTareaDto): Tarea {
  //   const { titulo, descripcion } = crearTareaDto;
  //   const tx: Tarea = {
  //     id: uuid(),
  //     titulo,
  //     descripcion,
  //     status: StatusTarea.ABIERTA,
  //   };
  //   this.tareas.push(tx);
  //   return tx;
  // }

  crearTarea(crearTareaDto: CrearTareaDto): Promise<Tarea> {
    return this.tareasRepository.crearTarea(crearTareaDto);
  }

  async borrarTarea(id: string): Promise<void> {
    const resultadox = await this.tareasRepository.delete(id);
    if (resultadox.affected === 0) {
      throw new NotFoundException(
        `La tarea con el ID "${id}" no se encontro en la base de datos`,
      );
    }
  }

  //borrarTarea(id: string): void {
  /* Este método va servir para eliminar un elemento que coincida con el id enviado, estamos tilizando un método de las colecciones denominado 
       filter por medio del cual generamos un arrreglo de resultado que no contiene el elemento a eliminar*/
  /*La función por si sola funciona, dado que si no encuentra el ID no realiza ninguna actividad, esta era la función original:
                      this.tareas = this.tareas.filter((tx) => tx.id != id);
    Igual que la función buscar por ID, era una sola línea de código, pero tenia el mismo detalle que la función buscar, aunque no encontrara el elemento 
    no hacia nada al respecto de mencionar el error
    */
  //   const tex = this.getTareaByID(id);
  //   this.tareas = this.tareas.filter((tx) => tx.id !== tex.id);
  // }
  // updateStatusTarea(id: string, status: StatusTarea) {
  //   const tx = this.getTareaByID(id);
  //   tx.status = status;
  //   return tx;
  // }
  async updateStatusTarea(id: string, status: StatusTarea): Promise<Tarea> {
    const tx = await this.getTareaByID(id);
    tx.status = status;
    await this.tareasRepository.save(tx);
    return tx;
  }
}
