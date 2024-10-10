import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';
import { EmployeeModule } from './employee/employee.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    StoreModule,
    EmployeeModule,
    ScheduleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
