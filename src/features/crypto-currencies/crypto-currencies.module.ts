import { Module } from '@nestjs/common';
import { CryptoCurrencyDetailResolver } from 'src/features/crypto-currencies/queries/crypto-currency-detail.resolver';
import { CryptoCurrenciesService } from 'src/features/crypto-currencies/crypto-currencies.service';
import { UpbitModule } from 'src/external/upbit/upbit.module';
import { SubscribeCryptoCurrencyPriceResolver } from 'src/features/crypto-currencies/subscriptions/subscribe-crypto-currency-price.resolver';
import { PublishCryptoCurrencyPriceResolver } from 'src/features/crypto-currencies/mutations/publish-crypto-currency-price.resolver';
import { PubSubModule } from 'src/shared/pub-sub/pub-sub.module';

const mutations = [PublishCryptoCurrencyPriceResolver];
const queries = [CryptoCurrencyDetailResolver];
const subscriptions = [SubscribeCryptoCurrencyPriceResolver];

@Module({
  imports: [UpbitModule, PubSubModule],
  providers: [
    CryptoCurrenciesService,
    ...mutations,
    ...queries,
    ...subscriptions,
  ],
})
export class CryptoCurrenciesModule {}
