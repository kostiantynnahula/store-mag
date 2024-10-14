import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ScheduleTopics } from 'store-mag-types';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject('SCHEDULE_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(ScheduleTopics.GET_SCHEDULE);
    this.client.subscribeToResponseOf(ScheduleTopics.GET_SHIFT);
    this.client.subscribeToResponseOf(ScheduleTopics.CREATE_SHIFT);
    this.client.subscribeToResponseOf(ScheduleTopics.UPDATE_SHIFT);
    this.client.subscribeToResponseOf(ScheduleTopics.DELETE_SHIFT);
    await this.client.connect();
  }

  async list() {
    return this.client.send(ScheduleTopics.GET_SCHEDULE, {});
  }

  async getShift(id: string) {
    return this.client.send(ScheduleTopics.GET_SHIFT, id);
  }

  async createShift(data: CreateShiftDto) {
    return this.client.send(ScheduleTopics.CREATE_SHIFT, { ...data });
  }

  async updateShift(id: string, data: UpdateShiftDto) {
    return this.client.send(ScheduleTopics.UPDATE_SHIFT, { ...data, id });
  }

  async deleteShift(id: string) {
    return this.client.send(ScheduleTopics.DELETE_SHIFT, id);
  }
}
