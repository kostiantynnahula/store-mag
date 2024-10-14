import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ListStoreQuery {
  @ApiPropertyOptional({ type: 'number', required: false })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: 'number', required: false })
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional({ type: 'boolean', required: false })
  @IsOptional()
  includeTotal?: boolean;

  @ApiPropertyOptional({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({ type: 'string', required: false })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: string;

  @ApiPropertyOptional({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  q?: string;
}
