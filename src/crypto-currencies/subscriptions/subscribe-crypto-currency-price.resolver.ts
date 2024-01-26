import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubSub = new RedisPubSub();

@Resolver((_) => CryptoCurrency)
export class SubscribeCryptoCurrencyPriceResolver {
  constructor() {}

  @Subscription((_) => CryptoCurrency, {
    resolve: (payload) => payload,
    nullable: true,
  })
  subscribeCryptoCurrencyPrice(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    return pubSub.asyncIterator(`${base}-${counter}`);
  }
}
