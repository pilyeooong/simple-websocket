import { Module } from '@nestjs/common';
import { CryptoCurrenciesResolver } from './crypto-currencies.resolver';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { UpbitModule } from '../external/upbit/upbit.module';

@Module({
  imports: [UpbitModule],
  providers: [CryptoCurrenciesResolver, CryptoCurrenciesService],
})
export class CryptoCurrenciesModule {}
