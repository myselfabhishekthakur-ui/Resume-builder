import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { ResumesParserService } from './resumes.parser.service';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService, ResumesParserService],
})
export class ResumesModule {}
