import { Injectable } from '@nestjs/common';
import { CryptoCurrency } from 'src/features/crypto-currencies/models/crypto-currency.model';
import { uuid } from 'uuidv4';

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
      id: uuid(),
      symbol: base,
      base: base,
      counter: counter,
      price: price,
    };
  }
}
