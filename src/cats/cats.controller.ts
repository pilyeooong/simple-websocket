import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const cat = this.catsService.create(createCatDto);

    return cat;
  }

  @Get()
  async listAll(): Promise<Cat[]> {
    return this.catsService.listAll();
  }
}
