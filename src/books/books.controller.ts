import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksAuthorService } from 'src/books-author/books-author.service';
import { CreateBookAuthorDto } from 'src/books-author/dto/create-book.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService, 
    private readonly booksAuthorService: BooksAuthorService 
  ) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Post('addAuthor') 
  async addAuthorToBook(@Body() createBookAuthorDto: CreateBookAuthorDto) {
    return this.booksAuthorService.addAuthorToBook(createBookAuthorDto);
  }

  @Get(':id')
  async getOneBook(@Param('id') id: number) {
    const book = this.booksService.getOneBook(id);
    const bookAuthors = this.booksAuthorService.getBookAuthors(id);

    return {...book, authors: bookAuthors}
  }

  @Get()
  async getBooks() {
    return this.booksService.getBooks();
  }

  @Patch('update/:id')
  async updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto)
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id') id: number) {
    return this.booksAuthorService.deleteBook(id)
  }

  @Delete('removeAuthor/:authorId/:bookId')
  async removeAuthorFromBook(@Param('authorId') authorId: number, @Param('bookId') bookId: number) {
    return this.booksAuthorService.removeAuthorFromBook(`${authorId}${bookId}`)
  }
}
