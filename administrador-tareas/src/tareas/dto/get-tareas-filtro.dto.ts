import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusTarea } from '../tareas.status.enum';

export class GetTareasFiltroDto {
  /*El signo de interrogación significa que el parametro es opcional puede o no ser incluiído 
  
  status?: StatusTarea;
  search?: string;

  */

  /*El segundo cambio que se hizo  a este DTO es el de agrear decoraciones para demostrar que es opcional y que se pueda validar
  dado que este ya es un DTO y que usamos estos para las validaciones anteriores basta con agregar las decoraciones correspondientes*/
  @IsOptional()
  @IsEnum(StatusTarea)
  status?: StatusTarea;

  @IsOptional()
  @IsString()
  search?: string;
}
