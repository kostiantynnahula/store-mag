import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Get()
  async list() {
    return await this.service.list();
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
