import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
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
    return this.booksService.deleteBook(id)
  }
}
