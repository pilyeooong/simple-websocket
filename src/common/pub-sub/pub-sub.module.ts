import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Module({
  imports: [],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new RedisPubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
