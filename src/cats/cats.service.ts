import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);

    return cat;
  }

  listAll(): Cat[] {
    return this.cats;
  }
}
