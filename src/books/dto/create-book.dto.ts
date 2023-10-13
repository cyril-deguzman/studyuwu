import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsString()
  @IsOptional()
  isbn: string;

  @IsNumber()
  @IsOptional()
  pages: number;

  @IsNumber()
  @IsOptional()
  price: number;
}