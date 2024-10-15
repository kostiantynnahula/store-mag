import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
// import { StoreTopics } from 'store-mag-types';

@Injectable()
export class ProductService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('product.list');
    await this.client.connect();
  }

  async list() {
    return this.client.send('product.list', {});
  }
}
