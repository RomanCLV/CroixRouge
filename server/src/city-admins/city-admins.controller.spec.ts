import { Test, TestingModule } from '@nestjs/testing';
import { CityAdminsController } from './city-admins.controller';

describe('CityAdminsController', () => {
  let controller: CityAdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityAdminsController],
    }).compile();

    controller = module.get<CityAdminsController>(CityAdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
