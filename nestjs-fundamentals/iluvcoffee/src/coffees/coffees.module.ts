import { Module } from '@nestjs/common';
import { CoffeService } from 'src/coffe/coffe.service';
import { CoffesController } from 'src/coffes/coffes.controller';

@Module({ controllers: [CoffesController], providers: [CoffeService] })
export class CoffeesModule {}
