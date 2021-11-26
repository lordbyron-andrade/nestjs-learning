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
import { StatusTarea } from './tareas.status.enum';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { GetTareasFiltroDto } from './dto/get-tareas-filtro.dto';
import { UpdateTareaStatusDto } from './dto/update-tarea-status.dto';
import { Tarea } from './tarea.entity';

@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  getTareas(@Query() filtroDto: GetTareasFiltroDto): Promise<Tarea[]> {
    return this.tareasService.getTareas(filtroDto);
  }

  // @Get()
  // getTareas(@Query() filtroDto: GetTareasFiltroDto): Tarea[] {
  //   //Si tenemos algunos filtros definidos, se llama a la función tareasService getTareasConFiltro
  //   //de otr manera, se obtienen todas las tareas
  //   if (Object.keys(filtroDto).length) {
  //     return this.tareasService.getTareasConFiltro(filtroDto);
  //   } else {
  //     return this.tareasService.getAllTareas();
  //   }
  // }

  /* Este handler es casi identico al que obtiene todas las tareas la diferencia es el parametro, es decir que la ruta hace un match como el
  de ML*/
  // @Get('/:id')
  // getTareaById(@Param('id') id: string): Tarea {
  //   return this.tareasService.getTareaByID(id);
  // }
  @Get('/:id')
  getTareaById(@Param('id') id: string): Promise<Tarea> {
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
  //   @Post()
  //   crearTarea(@Body() crearTareaDto: CrearTareaDto): Tarea {
  //     return this.tareasService.crearTarea(crearTareaDto);
  //   }

  //   @Post()
  //   crearTarea(@Body() crearTareaDto: CrearTareaDto): Tarea {
  //     return this.tareasService.crearTarea(crearTareaDto);
  //   }
  @Post()
  crearTarea(@Body() crearTareaDto: CrearTareaDto): Promise<Tarea> {
    return this.tareasService.crearTarea(crearTareaDto);
  }

  //   @Delete('/:id')
  //   eliminarTarea(@Param('id') id: string): void {
  //     return this.tareasService.borrarTarea(id);
  //   }
  @Delete('/:id')
  eliminarTarea(@Param('id') id: string): Promise<void> {
    return this.tareasService.borrarTarea(id);
  }

  //   @Patch('/:id/status')
  //   updateStatusTarea(
  //     @Param('id') id: string,
  //     /*Este cambio se hizo para poder usar la validación del status */
  //     //@Body('status') status: StatusTarea,
  //     @Body() updateTareaStatusDto: UpdateTareaStatusDto,
  //   ): Tarea {
  //     const { status } = updateTareaStatusDto;
  //     return this.tareasService.updateStatusTarea(id, status);
  //   }
  @Patch('/:id/status')
  updateStatusTarea(
    @Param('id') id: string,
    @Body() updateTareaStatusDto: UpdateTareaStatusDto,
  ): Promise<Tarea> {
    const { status } = updateTareaStatusDto;
    return this.tareasService.updateStatusTarea(id, status);
  }
}
