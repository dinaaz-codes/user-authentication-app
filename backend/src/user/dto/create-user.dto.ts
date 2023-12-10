import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'signfies the name for the user',
    example: 'dinaaz shaikh',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'signfies the email for the user',
    example: 'dinaaz@mailinator.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'signfies the password of the user',
    example: 'P@ssw0rd',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'password must contain at least one letter, one number, one special character and must be of minimum length 8',
  })
  password: string;
}
