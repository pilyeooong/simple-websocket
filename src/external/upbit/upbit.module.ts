import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UpbitService } from './upbit.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [JwtModule, HttpModule],
  providers: [UpbitService],
  exports: [UpbitService],
})
export class UpbitModule {}
