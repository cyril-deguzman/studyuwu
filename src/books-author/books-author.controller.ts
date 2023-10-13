import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Author } from 'src/authors/interfaces/author.interface';
import { Book } from 'src/books/interfaces/book.interface';
import { BooksAuthorService } from './books-author.service';
import { CreateBookAuthorDto } from './dto/create-book.dto';
import { BookAuthor } from './interfaces/book-author.interface';

@Controller('books-author')
export class BooksAuthorController {
  constructor(private readonly booksAuthorService: BooksAuthorService) {}

  @Get()
  async getBookAuthors(): Promise<BookAuthor[]> {
    return this.booksAuthorService.getAllBookAuthors();
  }

  @Post('add-author')
  async addAuthorToBook(
    @Body() createBookAuthorDto: CreateBookAuthorDto,
  ): Promise<BookAuthor> {
    return this.booksAuthorService.addAuthorToBook(createBookAuthorDto);
  }

  @Delete('author/:id')
  async deleteAuthor(
    @Param('id') authorId: number,
  ): Promise<Author & { removedConnections: BookAuthor[] }> {
    return this.booksAuthorService.deleteAuthor(authorId);
  }

  @Delete('book/:id')
  async deleteBook(
    @Param('id') bookId: number,
  ): Promise<Book & { authors: BookAuthor[] }> {
    return this.booksAuthorService.deleteBook(bookId);
  }

  @Delete('remove-author/:authorId/:bookId')
  async removeAuthorFromBook(
    @Param('authorId') authorId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.booksAuthorService.removeAuthorFromBook(`${authorId}${bookId}`);
  }
}
