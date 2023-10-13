import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get(':id')
  async getOneBook(@Param('id') id: number): Promise<Book> {
    const book = this.booksService.getOneBook(id);
    return book;
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Patch('update/:id')
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto);
  }
}
