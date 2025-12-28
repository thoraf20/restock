import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  // Business Info
  @ApiProperty({ example: 'My Awesome Business' })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({ example: 'my-business', required: false })
  @IsString()
  @IsOptional()
  businessSlug?: string;

  // Owner Info
  @ApiProperty({ example: 'owner@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;
}
