import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CryptoCurrency } from 'src/crypto-currencies/models/crypto-currency.model';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { Inject } from '@nestjs/common';

@Resolver((_) => CryptoCurrency)
export class PublishCryptoCurrencyPriceResolver {
  constructor(
    private cryptoCurrenciesService: CryptoCurrenciesService,
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
  ) {}

  @Mutation((_) => CryptoCurrency)
  async publishCryptoCurrencyPrice(
    @Args('base', { type: () => String }) base: string,
    @Args('counter', { type: () => String }) counter: string,
  ) {
    const price = Math.floor(Math.random() * 100000);
    const cryptoCurrency = this.cryptoCurrenciesService.createDummy({
      base,
      counter,
      price,
    });
    await this.pubSub.publish(`${base}-${counter}`, cryptoCurrency);

    return cryptoCurrency;
  }
}
