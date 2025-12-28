import { IsNotEmpty, IsString, IsLowercase, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'My Awesome Business' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'my-business' })
  @IsString()
  @IsOptional()
  @IsLowercase()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug must contain only lowercase letters, numbers, and hyphens',
  })
  slug?: string;
}
