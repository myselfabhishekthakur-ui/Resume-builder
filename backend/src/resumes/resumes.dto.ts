import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreateResumeDto {
  @IsString()
  templateId: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsObject()
  data: Record<string, any>;
}

export class UpdateResumeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  templateId?: string;

  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
