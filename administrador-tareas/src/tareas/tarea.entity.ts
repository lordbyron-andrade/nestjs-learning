import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusTarea } from './tareas.model';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  status: StatusTarea;
}
