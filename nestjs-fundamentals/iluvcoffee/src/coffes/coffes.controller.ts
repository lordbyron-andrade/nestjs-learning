import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeService } from 'src/coffe/coffe.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffes')
export class CoffesController {
  constructor(private readonly coffeeService: CoffeService) {}
  @Get()
  findAll(@Query() paginationQuery) {
    //const { limit, offset } = paginationQuery;
    return this.coffeeService.findAll();
    //return `This action return all coffes. Limit ${limit}, offset ${offset}`;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    //return `This action returns #${id} coffee`;
    return this.coffeeService.findOne(id);
  }
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    //return body;
    return this.coffeeService.create(createCoffeeDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
    //return `This action removes #${id} coffe`;
  }
}
