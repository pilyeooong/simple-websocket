import { Injectable } from '@nestjs/common';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';

@Injectable()
export class CryptoCurrenciesService {
  createDummy({
    base = 'BTC',
    counter = 'KRW',
    price = 123456,
  }: {
    base?: string;
    counter?: string;
    price?: number;
  }): CryptoCurrency {
    return {
      id: 'id',
      symbol: base,
      base: base,
      counter: counter,
      price: price,
    };
  }
}
