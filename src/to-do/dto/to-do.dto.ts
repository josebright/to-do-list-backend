import { 
    IsNotEmpty, 
    IsString,
    MaxLength,
} from "class-validator";
import { PartialType } from '@nestjs/mapped-types';


export class CreateToDoDto {
    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    items: string;
}


export class UpdateToDoDto extends PartialType(CreateToDoDto) {
    
}