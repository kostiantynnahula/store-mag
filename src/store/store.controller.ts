import { Controller, Get } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Get()
  async list() {
    return this.service.list();
  }
}
