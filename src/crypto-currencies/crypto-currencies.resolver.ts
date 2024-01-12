import { Resolver, Query } from '@nestjs/graphql';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';

@Resolver((_) => CryptoCurrency)
export class CryptoCurrenciesResolver {
  constructor(private cryptoCurrenciesService: CryptoCurrenciesService) {}

  @Query((returns) => CryptoCurrency)
  sayHello() {
    return {
      id: 'id',
      symbol: 'BTC',
    };
  }
}