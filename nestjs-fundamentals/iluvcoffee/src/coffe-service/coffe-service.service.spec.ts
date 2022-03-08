import { Test, TestingModule } from '@nestjs/testing';
import { CoffeServiceService } from './coffe-service.service';

describe('CoffeServiceService', () => {
  let service: CoffeServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeServiceService],
    }).compile();

    service = module.get<CoffeServiceService>(CoffeServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
