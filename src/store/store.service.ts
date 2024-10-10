import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('store.list');
    this.client.subscribeToResponseOf('store.create');
    this.client.subscribeToResponseOf('store.findById');
    this.client.subscribeToResponseOf('store.update');
    this.client.subscribeToResponseOf('store.delete');
    await this.client.connect();
  }

  async list() {
    return this.client.send('store.list', {});
  }

  async create(data: CreateStoreDto) {
    return this.client.send('store.create', {
      ...data,
    });
  }

  async findById(id: string) {
    return this.client.send('store.findById', id);
  }

  async update(id: string, data: UpdateStoreDto) {
    return this.client.send('store.update', {
      id,
      ...data,
    });
  }

  async delete(id: string) {
    return this.client.send('store.delete', id);
  }
}
