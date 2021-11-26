import { EntityRepository, Repository } from 'typeorm';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { GetTareasFiltroDto } from './dto/get-tareas-filtro.dto';
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

  async getTareas(filtroDto: GetTareasFiltroDto): Promise<Tarea[]> {
    /**Me sigue pareceindo muy impresionantes las capcidades del TypeORM y de NestJS, porque igual de RoR simplemente funcionan, aqui se genera un
     * Query Builder solo con la entidad mencionada en el código, pero falta ver si la reconoce aunque sea con minusculas, dado que la definición esta
     * declarada con una mayuscula, y de nuevo en la prueba simplemente funciono, es grandioso.
     */
    const query = this.createQueryBuilder('tarea');

    const { status, search } = filtroDto;

    if (status) {
      query.andWhere('tarea.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'tarea.titulo LIKE :search OR tarea.descripcion LIKE :search',
        { search: `%${search}%` },
      );
    }

    /** Después del testeo se determino que las condicionales son acumulativas*/
    const tareas = await query.getMany();
    return tareas;
  }
}
