import { Test, TestingModule } from '@nestjs/testing';
import { UpbitService } from './upbit.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('UpbitService', () => {
  let service: UpbitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: false,
        }),
        JwtModule,
        HttpModule,
      ],
      providers: [UpbitService],
    }).compile();

    service = module.get<UpbitService>(UpbitService);
  });

  it('should create access token', async () => {
    const queryString = 'foo=123&bar=456';
    const accessToken = await service.generateAccessToken(queryString);

    console.log(accessToken);
    expect(accessToken).not.toBeNull();
  });

  it('should get BTC price data obj', async () => {
    const base = 'BTC';
    const counter = 'KRW';

    const priceData = await service.getPriceData({ base, counter });

    console.log(priceData);
    expect(priceData).not.toBeNull();
  });

  it('should get current BTC Price', async () => {
    const base = 'BTC';
    const counter = 'KRW';
    const price = await service.getCurrentPrice({ base, counter });

    console.log(price);
    expect(price).not.toBeNull();
  });
});
