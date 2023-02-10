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
  @Length(3, 20, {
    message:
      'Password has to be between 3 and 20 chars',
  })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //Password should contain black and small alphabet
    { message: 'Password is weak' },
  )
  password: string;
}
