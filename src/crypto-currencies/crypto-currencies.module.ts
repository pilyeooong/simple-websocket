import { Module } from '@nestjs/common';
import { CryptoCurrenciesResolver } from './crypto-currencies.resolver';
import { CryptoCurrenciesService } from './crypto-currencies.service';

@Module({
  providers: [CryptoCurrenciesResolver, CryptoCurrenciesService],
})
export class CryptoCurrenciesModule {}
