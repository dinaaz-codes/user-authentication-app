import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({
    example: 'dinaaz@mailinator.com',
    description: 'signifies the email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'signifies the password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
