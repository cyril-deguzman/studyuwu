import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './interfaces/author.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAuthors(): Promise<Author[]> {
    return this.authorsService.getAuthors();
  }

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Patch('update/:id')
  async updateAuthor(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }
}
