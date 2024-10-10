import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('employee.list');
    this.client.subscribeToResponseOf('employee.create');
    this.client.subscribeToResponseOf('employee.findById');
    this.client.subscribeToResponseOf('employee.update');
    this.client.subscribeToResponseOf('employee.delete');

    await this.client.connect();
  }

  async list() {
    return this.client.send('employee.list', {});
  }

  async create(data: CreateEmployeeDto) {
    return this.client.send('employee.create', { ...data });
  }

  async findById(id: string) {
    return this.client.send('employee.findById', id);
  }

  async update(id: string, data: UpdateEmployeeDto) {
    return this.client.send('employee.update', { id, ...data });
  }

  async delete(id: string) {
    return this.client.send('employee.delete', id);
  }
}
