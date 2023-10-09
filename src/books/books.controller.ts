import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }
}
