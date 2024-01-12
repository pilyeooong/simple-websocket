import { CatsController } from './cats.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('cats', () => {
    it('should create cat', async () => {
      const catObj = { name: 'i am cat' };
      const result = await catsController.create(catObj);
      expect(result).toEqual(catObj);
    });

    it('should list all cats', async () => {
      const result = await catsController.listAll();
      expect(result.length).toEqual(0);
    });
  });
});
