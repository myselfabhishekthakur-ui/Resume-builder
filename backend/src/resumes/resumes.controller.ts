import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumesService } from './resumes.service';
import { ResumesParserService } from './resumes.parser.service';
import { CreateResumeDto, UpdateResumeDto } from './resumes.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('resumes')
@UseGuards(JwtAuthGuard)
export class ResumesController {
  constructor(
    private resumesService: ResumesService,
    private parserService: ResumesParserService
  ) {}

  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  async parseResume(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return this.parserService.parseFile(file);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateResumeDto) {
    return this.resumesService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.resumesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.resumesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateResumeDto) {
    return this.resumesService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.resumesService.remove(id, req.user.id);
  }
}
