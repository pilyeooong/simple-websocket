import { Test, TestingModule } from '@nestjs/testing';
import { CryptoCurrenciesService } from 'src/features/crypto-currencies/crypto-currencies.service';

describe('CryptoCurrenciesService', () => {
  let service: CryptoCurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoCurrenciesService],
    }).compile();

    service = module.get<CryptoCurrenciesService>(CryptoCurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
