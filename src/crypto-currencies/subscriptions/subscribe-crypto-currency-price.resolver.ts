import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';

@Resolver((_) => CryptoCurrency)
export class SubscribeCryptoCurrencyPriceResolver {
  constructor(@Inject('PUB_SUB') private pubSub: RedisPubSub) {}

  @Subscription((_) => CryptoCurrency, {
    resolve: (payload) => payload,
    nullable: true,
  })
  subscribeCryptoCurrencyPrice(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    return this.pubSub.asyncIterator(`${base}-${counter}`);
  }
}
