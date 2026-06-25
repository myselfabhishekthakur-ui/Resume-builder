import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/points')
  getPoints(@Req() req: any) {
    return this.usersService.getPoints(req.user.id);
  }

  @Post('me/redeem')
  redeemPoint(@Req() req: any) {
    return this.usersService.redeemPoint(req.user.id);
  }
}
