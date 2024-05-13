import { Test, TestingModule } from '@nestjs/testing';
import { CityAdminsService } from './city-admins.service';

describe('CityAdminsService', () => {
  let service: CityAdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityAdminsService],
    }).compile();

    service = module.get<CityAdminsService>(CityAdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
