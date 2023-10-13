import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './interfaces/author.interface';

@Injectable()
export class AuthorsService {
  constructor() {
    this.authors
      .set(1, {
        lastName: 'Gege',
        firstName: 'Akutami',
        authorId: 1,
        country: 'Japan',
      })
      .set(2, {
        lastName: 'Sagan',
        firstName: 'Sagan',
        authorId: 2,
        country: 'Japan',
      });
  }

  private readonly authors: Map<number, Author> = new Map();

  getAuthors(): Author[] {
    return Array.from(this.authors.values());
  }

  getOneAuthor(authorId: number): Author {
    if (!this.authors.has(authorId))
      throw new HttpException(
        'Author does not exist with that id',
        HttpStatus.NOT_FOUND,
      );

    return this.authors.get(authorId);
  }

  createAuthor(author: Author): Author {
    if (this.authors.has(author.authorId))
      throw new HttpException(
        'Author already exists with that id',
        HttpStatus.FORBIDDEN,
      );

    this.authors.set(author.authorId, author);
    return this.authors.get(author.authorId);
  }

  updateAuthor(authorId: number, updates: UpdateAuthorDto): Author {
    if (!this.authors.has(authorId))
      throw new HttpException(
        'Author does not exist with that id',
        HttpStatus.NOT_FOUND,
      );

    const oldAuthor = this.authors.get(authorId);
    this.authors.set(authorId, { ...oldAuthor, ...updates });

    return this.authors.get(authorId);
  }

  deleteAuthor(authorId: number): Author {
    if (!this.authors.has(authorId))
      throw new HttpException(
        'Author with that id is already deleted or does not exist',
        HttpStatus.NOT_FOUND,
      );

    const deletedAuthor = this.authors.get(authorId);
    this.authors.delete(authorId);

    return deletedAuthor;
  }

  hasAuthor(authorId: number): boolean {
    return this.authors.has(authorId);
  }
}
