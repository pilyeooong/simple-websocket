import { CatsController } from 'src/cats/cats.controller';
import { CatsService } from 'src/cats/cats.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  exports: [],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
