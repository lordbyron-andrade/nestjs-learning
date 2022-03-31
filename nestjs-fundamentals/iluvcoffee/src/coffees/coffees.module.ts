import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeService } from 'src/coffe/coffe.service';
import { CoffesController } from 'src/coffes/coffes.controller';
import { Coffe } from 'src/coffes/entities/coffe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffe])],
  controllers: [CoffesController],
  providers: [CoffeService],
})
export class CoffeesModule {}
