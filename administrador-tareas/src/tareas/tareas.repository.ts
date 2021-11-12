import { EntityRepository, Repository } from 'typeorm';
import { Tarea } from './tarea.entity';

@EntityRepository(Tarea)
export class TareasRepository extends Repository<Tarea> {}
