import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get()
  async getSchedule() {
    return await this.service.list();
  }

  @Get('shift/:id')
  async getShift(@Param('id') id: string) {
    return await this.service.getShift(id);
  }

  @Post('shift')
  async createShift(@Body() data: CreateShiftDto) {
    return await this.service.createShift(data);
  }

  @Patch('shift/:id')
  async updateShift(@Param('id') id: string, @Body() data: UpdateShiftDto) {
    return await this.service.updateShift(id, data);
  }

  @Delete('shift/:id')
  async deleteShift(@Param('id') id: string) {
    return await this.service.deleteShift(id);
  }
}
