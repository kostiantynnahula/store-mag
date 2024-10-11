import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
import { Permissions } from './permission.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Permissions('read:profile')
  @Get('profile')
  async profile() {
    return 'profile';
  }
}
