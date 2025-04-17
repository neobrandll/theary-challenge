import { Body, Controller, Get, Post } from '@nestjs/common';
import { TreeService } from './tree.service';
import { Tree } from './tree.entity';
import { CreateTreeDto } from './dto/create-tree.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('tree')
export class TreeController {
  constructor(private treeService: TreeService) {}

  @Get()
  getTree(): Promise<Tree[]> {
    return this.treeService.getTree();
  }

  @ApiBody({
    description:
      'Creates a new tree node. If this is the first node in the database, please omit the parentId field, as no parent nodes will exist yet.',
    type: CreateTreeDto,
    examples: {
      root: {
        summary: 'Create root tree',
        value: {
          label: 'Root Tree',
        },
      },
      child: {
        summary: 'Create child tree',
        value: {
          label: 'Child Tree',
          parentId: 1,
        },
      },
    },
  })
  @Post()
  createTree(@Body() createDto: CreateTreeDto): Promise<Tree> {
    return this.treeService.createTree(createDto);
  }
}
