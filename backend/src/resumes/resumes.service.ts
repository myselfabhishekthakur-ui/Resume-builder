import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResumeDto, UpdateResumeDto } from './resumes.dto';

@Injectable()
export class ResumesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateResumeDto) {
    return this.prisma.resume.create({
      data: {
        userId,
        templateId: dto.templateId,
        title: dto.title || 'My Resume',
        data: JSON.stringify(dto.data),
      },
    });
  }

  async findAll(userId: string) {
    const resumes = await this.prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
    return resumes.map((r) => ({ ...r, data: JSON.parse(r.data) }));
  }

  async findOne(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.userId !== userId) throw new ForbiddenException();
    return { ...resume, data: JSON.parse(resume.data) };
  }

  async update(id: string, userId: string, dto: UpdateResumeDto) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.userId !== userId) throw new ForbiddenException();

    const updated = await this.prisma.resume.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.templateId && { templateId: dto.templateId }),
        ...(dto.data && { data: JSON.stringify(dto.data) }),
      },
    });
    return { ...updated, data: JSON.parse(updated.data) };
  }

  async remove(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.userId !== userId) throw new ForbiddenException();
    await this.prisma.resume.delete({ where: { id } });
    return { message: 'Resume deleted successfully' };
  }
}
