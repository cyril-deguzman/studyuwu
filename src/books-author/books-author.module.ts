import { Module } from '@nestjs/common';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksModule } from 'src/books/books.module';
import { BooksAuthorService } from './books-author.service';
import { BooksAuthorController } from './books-author.controller';

@Module({
  controllers: [BooksAuthorController],
  providers: [BooksAuthorService],
  imports: [BooksModule, AuthorsModule],
})
export class BooksAuthorModule {}
