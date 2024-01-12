import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CryptoCurrency {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  symbol: string;

  @Field((type) => String)
  base: string;

  @Field((type) => String)
  counter: string;

  @Field((type) => Float)
  price: number;
}
