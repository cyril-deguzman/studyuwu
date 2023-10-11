import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './interfaces/author.interface';

@Injectable()
export class AuthorsService {
  constructor() {
    this.authors.set(1, {
      lastName: "de guzman",
      firstName: "ethan",
      id: 1
    })
  }

  private readonly authors: Map<number, Author> = new Map()

  getAuthors() {
    return Array.from(this.authors.values());
  }

  createAuthor(author: Author) {
    this.authors.set(author.id, author);
    return this.authors.get(author.id);
  }                 
  
  updateAuthor(id: number, updates: UpdateAuthorDto) {
    if(!this.authors.has(id))
      throw new HttpException('Does not Exist', HttpStatus.NOT_FOUND);

    const oldAuthor = this.authors.get(id);
    this.authors.set(id, {...oldAuthor, ...updates})
    
    return this.authors.get(id);
  }

  deleteAuthor(id: number) {
    if(!this.authors.has(id))
      throw new HttpException('Does not Exist', HttpStatus.NOT_FOUND);
    
    const deletedAuthor = this.authors.get(id);
    this.authors.delete(id);

    return deletedAuthor;
  }
}
