import { Resolver, Query, Args } from '@nestjs/graphql';
import { CryptoCurrenciesService } from 'src/features/crypto-currencies/crypto-currencies.service';
import { CryptoCurrency } from 'src/features/crypto-currencies/models/crypto-currency.model';
import { UpbitService } from 'src/external/upbit/upbit.service';

@Resolver((_) => CryptoCurrency)
export class CryptoCurrencyDetailResolver {
  constructor(
    private cryptoCurrenciesService: CryptoCurrenciesService,
    private upbitService: UpbitService,
  ) {}

  @Query((_) => CryptoCurrency)
  async cryptoCurrencyDetail(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    const currentPrice = await this.upbitService.getCurrentPrice({
      base,
      counter,
    });
    const cryptoCurrency = this.cryptoCurrenciesService.createDummy({
      base,
      counter,
      price: currentPrice,
    });

    return cryptoCurrency;
  }
}
