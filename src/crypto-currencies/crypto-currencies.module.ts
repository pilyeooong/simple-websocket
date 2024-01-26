import { Module } from '@nestjs/common';
import { CryptoCurrencyDetailResolver } from 'src/crypto-currencies/queries/crypto-currency-detail.resolver';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { UpbitModule } from '../external/upbit/upbit.module';
import { SubscribeCryptoCurrencyPriceResolver } from 'src/crypto-currencies/subscriptions/subscribe-crypto-currency-price.resolver';
import { PublishCryptoCurrencyPriceResolver } from 'src/crypto-currencies/mutations/publish-crypto-currency-price.resolver';

const mutations = [PublishCryptoCurrencyPriceResolver];
const queries = [CryptoCurrencyDetailResolver];
const subscriptions = [SubscribeCryptoCurrencyPriceResolver];

@Module({
  imports: [UpbitModule],
  providers: [
    CryptoCurrenciesService,
    ...mutations,
    ...queries,
    ...subscriptions,
  ],
})
export class CryptoCurrenciesModule {}
