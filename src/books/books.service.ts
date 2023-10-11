import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces.ts/create-book.dto';

@Injectable()
export class BooksService {
  private readonly books: Map<number, Book> = new Map();

  constructor(){
    this.books.set(1, {
      id: 1,
      title: "test",
      author: "author",
      pages: 1,
    })
  }

  createBook(createBookDto: CreateBookDto) {
    this.books.set(createBookDto.id, createBookDto);
    return this.books.get(createBookDto.id)
  }

  deleteBook(id: number) {
    if(!this.books.has(id))
      throw new HttpException('Does not Exist', HttpStatus.NOT_FOUND);
    
    const deletedBook = this.books.get(id);
    this.books.delete(id);

    return deletedBook
  }

  updateBook(id: number, updateBookDto: UpdateBookDto) {
    if(!this.books.has(id))
      throw new HttpException('Does not Exist', HttpStatus.NOT_FOUND);

    const oldBook = this.books.get(id);
    this.books.set(id, {...oldBook, ...updateBookDto})
  
    return this.books.get(id);
  }

  getBooks() {
    return Array.from(this.books.values())
  }
}
