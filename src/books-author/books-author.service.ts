import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/interfaces/author.interface';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/interfaces/book.interface';
import { BookAuthor } from './interfaces/book-author.interface';

@Injectable()
export class BooksAuthorService {
  constructor(
    private readonly bookService: BooksService,
    private readonly authorService: AuthorsService,
  ) {
    this.booksAuthor
      .set(`${1}${1}`, { authorId: 1, bookId: 1, isMainAuthor: true })
      .set(`${2}${2}`, { authorId: 2, bookId: 2, isMainAuthor: true });
  }

  private readonly booksAuthor: Map<string, BookAuthor> = new Map();

  addAuthorToBook(bookAuthor: BookAuthor): BookAuthor {
    const key = `${bookAuthor.authorId}${bookAuthor.bookId}`;

    if (this.booksAuthor.has(key))
      throw new HttpException(
        'This author is already associated with this book',
        HttpStatus.FOUND,
      );

    if (!this.bookService.hasBook(bookAuthor.bookId))
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);

    if (!this.authorService.hasAuthor(bookAuthor.authorId))
      throw new HttpException('Author does not exist', HttpStatus.NOT_FOUND);

    this.booksAuthor.set(key, bookAuthor);

    return this.booksAuthor.get(key);
  }

  removeAuthorFromBook(bookAuthorKey: string): BookAuthor {
    if (!this.booksAuthor.has(bookAuthorKey))
      throw new HttpException(
        'This author does not exist or is simply not an author of the specified book',
        HttpStatus.NOT_FOUND,
      );

    const bookAuthor = this.booksAuthor.get(bookAuthorKey);

    if (bookAuthor.isMainAuthor)
      throw new HttpException(
        'Main author cannot be removed',
        HttpStatus.FORBIDDEN,
      );

    this.booksAuthor.delete(bookAuthorKey);
    return bookAuthor;
  }

  getAllBookAuthors() {
    return Array.from(this.booksAuthor.values());
  }

  getBookAuthors(bookId: number): Author[] {
    const authors: Author[] = [];

    for (const [key, value] of this.booksAuthor)
      if (value.bookId == bookId) {
        authors.push(this.authorService.getOneAuthor(value.authorId));
      }

    return authors;
  }

  getBookMainAuthor(bookId: number): Author {
    for (const [key, value] of this.booksAuthor)
      if (value.bookId == bookId)
        if (value.isMainAuthor)
          return this.authorService.getOneAuthor(value.authorId);
  }

  removeAllAuthorsFromBook(bookId: number): BookAuthor[] {
    const bookAuthors: BookAuthor[] = [];

    for (const [key, value] of this.booksAuthor)
      if (value.bookId == bookId) {
        bookAuthors.push(this.booksAuthor.get(key));
        this.booksAuthor.delete(key);
      }

    return bookAuthors;
  }

  removeAuthorsConnections(authorId: number): BookAuthor[] {
    const bookAuthors: BookAuthor[] = [];

    for (const [key, value] of this.booksAuthor)
      if (value.authorId == authorId) {
        bookAuthors.push(this.booksAuthor.get(key));
        this.booksAuthor.delete(key);
      }

    return bookAuthors;
  }

  deleteBook(bookId: number): Book & { authors: BookAuthor[] } {
    const deletedBook = this.bookService.deleteBook(bookId);
    const removedAuthors = this.removeAllAuthorsFromBook(bookId);

    return { ...deletedBook, authors: removedAuthors };
  }

  deleteAuthor(
    authorId: number,
  ): Author & { removedConnections: BookAuthor[] } {
    if (this.hasMainAuthoredBook(authorId))
      throw new HttpException(
        'Author still has a book he is a main author of. Delete books they have been a main author first.',
        HttpStatus.FORBIDDEN,
      );

    const deletedAuthor = this.authorService.deleteAuthor(authorId);
    const removedConnections = this.removeAuthorsConnections(authorId);

    return { ...deletedAuthor, removedConnections: removedConnections };
  }

  hasMainAuthoredBook(authorId: number): boolean {
    let res = false;

    for (const [key, value] of this.booksAuthor) {
      if (value.authorId == authorId && value.isMainAuthor) res = true;
    }

    return res;
  }
}
