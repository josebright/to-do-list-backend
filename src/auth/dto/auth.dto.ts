import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  Matches,
} from 'class-validator';

// Data transfer object authentication
export class Dto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 256, {
    message:
      'Password exceed meximium characters',
  })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //Password should contain black and small alphabet
    {
      message:
        'Password is weak, it should contain atleast (1 capital letter, 1 number)',
    },
  )
  password: string;
}
