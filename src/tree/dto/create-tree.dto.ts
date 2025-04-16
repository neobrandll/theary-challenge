import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @IsNumber()
  parentId: number;
}
