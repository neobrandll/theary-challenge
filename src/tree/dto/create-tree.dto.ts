import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTreeDto {
  @ApiProperty({ required: true, example: 'cat’s child' })
  @IsNotEmpty()
  label: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  parentId: number;
}
