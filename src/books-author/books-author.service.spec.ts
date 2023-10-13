import { Test, TestingModule } from '@nestjs/testing';
import { BooksAuthorService } from './books-author.service';

describe('BooksAuthorService', () => {
  let service: BooksAuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksAuthorService],
    }).compile();

    service = module.get<BooksAuthorService>(BooksAuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
