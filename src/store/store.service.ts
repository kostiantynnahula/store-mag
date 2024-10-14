import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreTopics } from 'store-mag-types';
import { ListStoreQuery } from './dto/list-store.dto';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(StoreTopics.LIST_STORE);
    this.client.subscribeToResponseOf(StoreTopics.CREATE_STORE);
    this.client.subscribeToResponseOf(StoreTopics.FIND_STORE);
    this.client.subscribeToResponseOf(StoreTopics.UPDATE_STORE);
    this.client.subscribeToResponseOf(StoreTopics.DELETE_STORE);
    await this.client.connect();
  }

  async list(query: ListStoreQuery) {
    return this.client.send(StoreTopics.LIST_STORE, { ...query });
  }

  async create(data: CreateStoreDto) {
    return this.client.send(StoreTopics.CREATE_STORE, {
      ...data,
    });
  }

  async findById(id: string) {
    return this.client.send(StoreTopics.FIND_STORE, id);
  }

  async update(id: string, data: UpdateStoreDto) {
    return this.client.send(StoreTopics.UPDATE_STORE, {
      id,
      ...data,
    });
  }

  async delete(id: string) {
    return this.client.send(StoreTopics.DELETE_STORE, id);
  }
}
