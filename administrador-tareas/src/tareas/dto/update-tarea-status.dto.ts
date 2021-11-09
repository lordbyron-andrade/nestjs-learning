import { IsEnum } from 'class-validator';
import { StatusTarea } from '../tareas.model';

/*Se crea este DTO para poder usar la validación que hemos usado hasta este momento, se usa el decorador y se le indica el tipo que se va a utuilizar para validarlo*/

export class UpdateTareaStatusDto {
  @IsEnum(StatusTarea)
  status: StatusTarea;
}
