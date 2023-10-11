import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthors() {
    return this.authorsService.getAuthors();
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Patch('update/:id')
  updateAuthor(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(id, updateAuthorDto)
  }

  @Delete('delete/:id')
  deleteAuthor(@Param('id') id: number) {
    return this.authorsService.deleteAuthor(id)
  }
}
