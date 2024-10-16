import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'store-mag-types';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async list(): Promise<Product[]> {
    return await this.service.list();
  }

  @Get(':index')
  async findByIndex(@Param('index') index: string): Promise<Product> {
    return await this.service.findByIndex(index);
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    return await this.service.create(body);
  }

  @Patch(':index')
  async update(@Param('index') index: string, @Body() body: UpdateProductDto) {
    return await this.service.update(index, body);
  }

  @Delete(':index')
  async delete(@Param('index') index: string) {
    return await this.service.delete(index);
  }
}
