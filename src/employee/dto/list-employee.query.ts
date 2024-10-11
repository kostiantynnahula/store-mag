import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListEmployeeQuery {
  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  per_page?: number;

  @ApiProperty({ type: 'boolean', required: false })
  @IsOptional()
  include_total?: boolean;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  sort?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  q?: string;
}
