import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tree } from './tree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tree])],
  providers: [TreeService],
  controllers: [TreeController],
  exports: [TypeOrmModule],
})
export class TreeModule {}
