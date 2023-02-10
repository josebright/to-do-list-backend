import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsIn,
  IsOptional,
  IsBoolean,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

// 💡 Translated list history type
export class TranslatedListHistory {
  @IsNotEmpty()
  translatedItem: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  timestamp: string;
}

// Data transfer object for creating todo list
export class createDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  item: string;
}

// Data transfer object for updating todo list
export class updateDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  @IsOptional()
  item: string;

  @IsBoolean()
  @IsOptional()
  hasClickedTranslate: boolean;

  @IsOptional()
  @IsIn(['PENDING', 'DONE'])
  status;

  @Type(() => TranslatedListHistory) // Data type for translated list
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  translatedList: [];
}
