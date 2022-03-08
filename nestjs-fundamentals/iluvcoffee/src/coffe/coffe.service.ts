import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffe } from 'src/coffes/entities/coffe.entity';

@Injectable()
export class CoffeService {
  private coffees: Coffe[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['Chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const cx = this.coffees.find((item) => item.id === +id);
    if (!cx) {
      throw new NotFoundException(`Coffe #${id} not found`);
    }
    return cx;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
