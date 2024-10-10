import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  storeId?: string;
}
