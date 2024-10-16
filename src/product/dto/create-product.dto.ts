import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ name: 'model', type: String, required: true })
  @IsDefined()
  model: string;

  @ApiProperty({ name: 'imei', type: String, required: true })
  @IsDefined()
  imei: string;

  @ApiProperty({ name: 'supplier', type: String, required: true })
  @IsDefined()
  supplier: string;

  @ApiProperty({ name: 'storeId', type: String, required: true })
  @IsDefined()
  storeId: string;

  @ApiProperty({ name: 'purchase_price', type: Number, required: false })
  @IsOptional()
  purchase_price: number;

  @ApiProperty({ name: 'expense', type: Number, required: false })
  @IsDefined()
  expense: number;

  @ApiProperty({ name: 'profit', type: Number, required: false })
  @IsDefined()
  profit: number;
}
