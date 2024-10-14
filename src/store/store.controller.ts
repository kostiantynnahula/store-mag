import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ListStoreQuery } from './dto/list-store.dto';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Get()
  async list(@Query() query: ListStoreQuery) {
    return await this.service.list(query);
  }

  @Post()
  async create(@Body() body: CreateStoreDto) {
    return await this.service.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateStoreDto) {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
