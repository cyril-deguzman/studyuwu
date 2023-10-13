import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor() {
    this.books
      .set(1, {
        bookId: 1,
        title: 'Jujutsu Kaisen',
        genre: 'Shounen',
      })
      .set(2, {
        bookId: 2,
        title: 'Old-fashioned Cupcake',
        genre: 'Romance, Slice-of-life',
      });
  }

  private readonly books: Map<number, Book> = new Map();

  createBook(createBookDto: CreateBookDto): Book {
    if (this.books.has(createBookDto.bookId))
      throw new HttpException(
        'Book with same id already exists',
        HttpStatus.FORBIDDEN,
      );

    this.books.set(createBookDto.bookId, createBookDto);
    return this.books.get(createBookDto.bookId);
  }

  deleteBook(bookId: number): Book {
    if (!this.books.has(bookId))
      throw new HttpException('Book does not Exist', HttpStatus.NOT_FOUND);

    const deletedBook = this.books.get(bookId);
    this.books.delete(bookId);

    return deletedBook;
  }

  updateBook(bookId: number, updateBookDto: UpdateBookDto): Book {
    if (!this.books.has(bookId))
      throw new HttpException('Book does not Exist', HttpStatus.NOT_FOUND);

    const oldBook = this.books.get(bookId);
    this.books.set(bookId, { ...oldBook, ...updateBookDto });

    return this.books.get(bookId);
  }

  getBooks(): Book[] {
    return Array.from(this.books.values());
  }

  getOneBook(bookId: number): Book {
    if (!this.books.has(bookId))
      throw new HttpException('Book does not Exist', HttpStatus.NOT_FOUND);

    return this.books.get(bookId);
  }
}
