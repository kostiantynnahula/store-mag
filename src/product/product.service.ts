import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductTopics, Product } from 'store-mag-types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @Inject('STORE_SERVICE_PRODUCT') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(ProductTopics.LIST_PRODUCT);
    this.client.subscribeToResponseOf(ProductTopics.FIND_PRODUCT);
    this.client.subscribeToResponseOf(ProductTopics.CREATE_PRODUCT);
    this.client.subscribeToResponseOf(ProductTopics.UPDATE_PRODUCT);
    this.client.subscribeToResponseOf(ProductTopics.DELETE_PRODUCT);

    await this.client.connect();
  }

  async list(): Promise<Product[]> {
    const response = this.client.send<Product[]>(
      ProductTopics.LIST_PRODUCT,
      {},
    );

    return await firstValueFrom(response);
  }

  async findByIndex(index: string): Promise<Product> {
    const response = this.client.send(ProductTopics.FIND_PRODUCT, index);

    return await firstValueFrom(response);
  }

  async create(data: CreateProductDto) {
    return this.client.send(ProductTopics.CREATE_PRODUCT, { ...data });
  }

  async update(index: string, data: UpdateProductDto) {
    return this.client.send(ProductTopics.UPDATE_PRODUCT, { index, ...data });
  }

  async delete(index: string) {
    return this.client.send(ProductTopics.DELETE_PRODUCT, index);
  }
}
