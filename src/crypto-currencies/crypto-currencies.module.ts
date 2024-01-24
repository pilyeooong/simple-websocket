import { Module } from '@nestjs/common';
import { CryptoCurrenciesResolver } from './crypto-currencies.resolver';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CryptoCurrenciesResolver, CryptoCurrenciesService],
})
export class CryptoCurrenciesModule {}
