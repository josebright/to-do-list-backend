import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class Dto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  item: string;
}
