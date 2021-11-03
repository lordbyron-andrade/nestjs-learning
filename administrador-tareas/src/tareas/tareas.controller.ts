import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { StatusTarea, Tarea } from './tareas.model';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { GetTareasFiltroDto } from './dto/get-tareas-filtro.dto';

@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  getTareas(@Query() filtroDto: GetTareasFiltroDto): Tarea[] {
    //Si tenemos algunos filtros definidos, se llama a la función tareasService getTareasConFiltro
    //de otr manera, se obtienen todas las tareas
    if (Object.keys(filtroDto).length) {
      return this.tareasService.getTareasConFiltro(filtroDto);
    } else {
      return this.tareasService.getAllTareas();
    }
  }

  /* Este handler es casi identico al que obtiene todas las tareas la diferencia es el parametro, es decir que la ruta hace un match como el
  de ML*/
  @Get('/:id')
  getTareaById(@Param('id') id: string): Tarea {
    return this.tareasService.getTareaByID(id);
  }

  /*@Post()
  crearTarea(@Body() body) {
    console.log('body', body);
  }*/

  /*@Post()
  crearTarea(
    @Body('titulo') titulo: string,
    @Body('descripcion') descripcion: string,
  ): Tarea {
    //console.log('titulo', titulo);
    //console.log('descripcion', descripcion);
    return this.tareasService.crearTarea(titulo, descripcion);
  }*/

  /*En esta versión del Handler del Post se esta utilizando el DTO para el manejo de las propiedades en forma mas sencilla, antes 
  algunas eran recomendaciones de buenas prácticas de programación, ahora los Frameworks hacen casi obligatrorias algunas de estas
  buenas prácticas */
  @Post()
  crearTarea(@Body() crearTareaDto: CrearTareaDto): Tarea {
    return this.tareasService.crearTarea(crearTareaDto);
  }

  @Delete('/:id')
  eliminarTarea(@Param('id') id: string): void {
    return this.tareasService.borrarTarea(id);
  }

  @Patch('/:id/status')
  updateStatusTarea(
    @Param('id') id: string,
    @Body('status') status: StatusTarea,
  ): Tarea {
    return this.tareasService.updateStatusTarea(id, status);
  }
}
