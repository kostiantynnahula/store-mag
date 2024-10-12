import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ name: 'name', type: String, required: true })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({ name: 'email', type: String, required: true })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ name: 'storeId', type: String })
  @IsOptional()
  @IsString()
  storeId?: string;
}
