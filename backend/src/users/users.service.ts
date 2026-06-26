import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getPoints(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
    });
    return { points: user?.points || 0 };
  }

  async redeemPoint(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.points < 20) {
      throw new BadRequestException('Insufficient points. You need 20 points to download.');
    }
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { points: user.points - 20 }
    });
    return { success: true, points: user.points - 20 };
  }
}
