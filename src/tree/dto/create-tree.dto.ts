import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTreeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @IsNumber()
  parentId: number;
}
