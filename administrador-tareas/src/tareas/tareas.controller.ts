import { Body, Controller, Get, Post } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea } from './tareas.model';
import { stringify } from 'querystring';

@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  getAllTareas(): Tarea[] {
    return this.tareasService.getAllTareas();
  }

  /*@Post()
  crearTarea(@Body() body) {
    console.log('body', body);
  }*/

  @Post()
  crearTarea(
    @Body('titulo') titulo: string,
    @Body('descripcion') descripcion: string,
  ): Tarea {
    /*console.log('titulo', titulo);
    console.log('descripcion', descripcion);*/
    return this.tareasService.crearTarea(titulo, descripcion);
  }
}
