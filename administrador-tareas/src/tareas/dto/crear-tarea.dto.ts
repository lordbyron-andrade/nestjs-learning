/* Los DTOs sirver para el flujo de los datos atraves de la aplicación*/
/* Se van a validar las clases por eso instalamos un paquete que se denomina class-validator una vez que se importa este solo se tiene que agregar una
implementación en el arranque de la aplicación y un decorador a la propiedad de la clase para validarla, en este caso se utiliza @IsNotEmpty para validar
la que la propiedad no este vacia*/
import { IsNotEmpty } from 'class-validator';

export class CrearTareaDto {
  @IsNotEmpty()
  titulo: string;
  @IsNotEmpty()
  descripcion: string;
}
