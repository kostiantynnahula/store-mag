import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('store.list');
    await this.client.connect();
  }

  async list() {
    return this.client.send('store.list', {});
  }
}
