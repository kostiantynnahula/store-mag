import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ListEmployeeQuery } from './dto/list-employee.query';
import { EmployeeTopics } from 'store-mag-types';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(EmployeeTopics.LIST_EMPLOYEE);
    this.client.subscribeToResponseOf(EmployeeTopics.CREATE_EMPLOYEE);
    this.client.subscribeToResponseOf(EmployeeTopics.FIND_EMPLOYEE);
    this.client.subscribeToResponseOf(EmployeeTopics.UPDATE_EMPLOYEE);
    this.client.subscribeToResponseOf(EmployeeTopics.DELETE_EMPLOYEE);

    await this.client.connect();
  }

  async list(query: ListEmployeeQuery) {
    return this.client.send(EmployeeTopics.LIST_EMPLOYEE, { ...query });
  }

  async create(data: CreateEmployeeDto) {
    return this.client.send(EmployeeTopics.CREATE_EMPLOYEE, { ...data });
  }

  async findById(id: string) {
    return this.client.send(EmployeeTopics.FIND_EMPLOYEE, id);
  }

  async update(id: string, data: UpdateEmployeeDto) {
    return this.client.send(EmployeeTopics.UPDATE_EMPLOYEE, { id, ...data });
  }

  async delete(id: string) {
    return this.client.send(EmployeeTopics.DELETE_EMPLOYEE, id);
  }
}
