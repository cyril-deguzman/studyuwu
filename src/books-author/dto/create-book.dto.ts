import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookAuthorDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsBoolean()
  @IsNotEmpty()
  isMainAuthor: boolean;
}