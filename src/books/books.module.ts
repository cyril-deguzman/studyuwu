import { Module } from '@nestjs/common';
import { AuthorsModule } from 'src/authors/authors.module';
import { AuthorsService } from 'src/authors/authors.service';
import { BooksAuthorService } from 'src/books-author/books-author.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksAuthorService],
  imports: [AuthorsModule]
})
export class BooksModule {}
