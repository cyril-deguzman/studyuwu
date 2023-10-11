import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsNumber()
  @IsOptional()
  price: number;
}