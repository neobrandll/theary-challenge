import { Body, Controller, Get, Post } from '@nestjs/common';
import { TreeService } from './tree.service';
import { Tree } from './tree.entity';
import { CreateTreeDto } from './dto/create-tree.dto';

@Controller('tree')
export class TreeController {
  constructor(private treeService: TreeService) {}

  @Get()
  getTree(): Promise<Tree[]> {
    return this.treeService.getTree();
  }

  @Post()
  createTree(@Body() createDto: CreateTreeDto): Promise<Tree> {
    return this.treeService.createTree(createDto);
  }
}
