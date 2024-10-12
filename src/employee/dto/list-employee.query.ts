import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListEmployeeQuery {
  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  perPage?: number;

  @ApiProperty({ type: 'boolean', required: false })
  @IsOptional()
  includeTotal?: boolean;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  sort?: string;

  @ApiProperty({ type: 'string', required: false })
  order?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  q?: string;
}
