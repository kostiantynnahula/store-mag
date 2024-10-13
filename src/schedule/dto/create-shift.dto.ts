import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsString } from 'class-validator';

export class CreateShiftDto {
  @ApiProperty({ name: 'date', type: Date, required: true })
  @IsDefined()
  @IsDateString()
  date: Date;

  @ApiProperty({ name: 'employeeId', type: String, required: true })
  @IsDefined()
  @IsString()
  employeeId: string;

  @ApiProperty({ name: 'storeId', type: String, required: true })
  @IsDefined()
  @IsString()
  storeId: string;
}
