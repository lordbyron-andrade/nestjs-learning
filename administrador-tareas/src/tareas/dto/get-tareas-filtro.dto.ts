import { StatusTarea } from '../tareas.model';

export class GetTareasFiltroDto {
  /*El signo de interrogación significa que el parametro es opcional puede o no ser incluiído */
  status?: StatusTarea;
  search?: string;
}
