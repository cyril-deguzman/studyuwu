import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAuthorDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}