import { Test, TestingModule } from '@nestjs/testing';
import { BooksAuthorController } from './books-author.controller';

describe('BooksAuthorController', () => {
  let controller: BooksAuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksAuthorController],
    }).compile();

    controller = module.get<BooksAuthorController>(BooksAuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
