import { Resolver, Query, Args } from '@nestjs/graphql';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';

@Resolver((_) => CryptoCurrency)
export class CryptoCurrencyDetailResolver {
  constructor(private cryptoCurrenciesService: CryptoCurrenciesService) {}

  @Query((_) => CryptoCurrency)
  cryptoCurrencyDetail(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    return this.cryptoCurrenciesService.createDummy({ base, counter });
  }
}
