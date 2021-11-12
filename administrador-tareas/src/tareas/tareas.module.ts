import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasController } from './tareas.controller';
import { TareasRepository } from './tareas.repository';
import { TareasService } from './tareas.service';

@Module({
  /**La línea del imports es la que se encarga de que el repositorio de clases este disponible para todo el modulo via DI */
  imports: [TypeOrmModule.forFeature([TareasRepository])],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
