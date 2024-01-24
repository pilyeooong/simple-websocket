import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';
import { PubSub } from 'graphql-subscriptions';
import { UpbitService } from 'src/external/upbit/upbit.service';

const pubSub = new PubSub();

@Resolver((_) => CryptoCurrency)
export class CryptoCurrenciesResolver {
  constructor(
    private cryptoCurrenciesService: CryptoCurrenciesService,
    private upbitService: UpbitService,
  ) {}

  @Query((_) => CryptoCurrency)
  cryptoCurrency(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    return this.cryptoCurrenciesService.createDummy({ base, counter });
  }

  @Mutation((_) => CryptoCurrency)
  publishCryptoCurrencyPrice(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    const price = Math.floor(Math.random() * 100000);
    const cryptoCurrency = this.cryptoCurrenciesService.createDummy({
      base,
      counter,
      price,
    });
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
