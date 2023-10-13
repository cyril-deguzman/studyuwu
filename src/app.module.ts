import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksAuthorModule } from './books-author/books-author.module';

@Module({
  imports: [BooksAuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
