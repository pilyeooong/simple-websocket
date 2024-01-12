import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver((_) => CryptoCurrency)
export class CryptoCurrenciesResolver {
  constructor(private cryptoCurrenciesService: CryptoCurrenciesService) {}

  private createDummy({
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

  @Query((_) => CryptoCurrency)
  cryptoCurrency(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    return this.createDummy({ base, counter });
  }

  @Mutation((_) => CryptoCurrency)
  publishCryptoCurrencyPrice(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    const price = Math.floor(Math.random() * 100000);
    const cryptoCurrency = this.createDummy({ base, counter, price });
    pubSub.publish(`${base}-${counter}`, cryptoCurrency);

    return cryptoCurrency;
  }

  @Subscription((_) => CryptoCurrency, {
    resolve: (payload) => payload,
  })
  subscribeCryptoCurrencyPrice(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    return pubSub.asyncIterator(`${base}-${counter}`);
  }
}
