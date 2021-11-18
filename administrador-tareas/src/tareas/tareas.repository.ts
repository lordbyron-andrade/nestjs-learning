import { EntityRepository, Repository } from 'typeorm';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { Tarea } from './tarea.entity';
import { StatusTarea } from './tareas.status.enum';

@EntityRepository(Tarea)
export class TareasRepository extends Repository<Tarea> {
  async crearTarea(crearTareaDto: CrearTareaDto): Promise<Tarea> {
    const { titulo, descripcion } = crearTareaDto;
    const tx = this.create({
      titulo,
      descripcion,
      status: StatusTarea.ABIERTA,
    });
    await this.save(tx);
    return tx;
  }
}
