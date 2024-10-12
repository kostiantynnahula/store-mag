import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ name: 'name', type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ name: 'address', type: String, required: true })
  @IsDefined()
  @IsNotEmpty()
  address: string;
}
