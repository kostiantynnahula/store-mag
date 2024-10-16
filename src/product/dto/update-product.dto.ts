import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsDefined, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ name: 'sale_date', type: String, required: false })
  @IsOptional()
  sale_date: string;

  @ApiPropertyOptional({ name: 'sale_price', type: Number, required: false })
  @IsDefined()
  sale_price: number;

  @ApiPropertyOptional({ name: 'salary', type: Number, required: false })
  @IsOptional()
  salary: number;

  @ApiPropertyOptional({ name: 'calculation', type: Number, required: false })
  @IsOptional()
  calculation: number;

  @ApiPropertyOptional({ name: 'result', type: Number, required: false })
  @IsOptional()
  result: number;
}
