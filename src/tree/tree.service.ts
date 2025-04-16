import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tree } from './tree.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateTreeDto } from './dto/create-tree.dto';

@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(Tree)
    private readonly treeRepository: Repository<Tree>,
  ) {}

  getTree(): Promise<Tree[]> {
    return this.treeRepository.find({
      where: { parent: IsNull() },
      relations: ['children', 'children.children'],
    });
  }

  async createTree(createTreeDto: CreateTreeDto): Promise<Tree> {
    const { label, parentId } = createTreeDto;
    const parent = await this.treeRepository.findOneBy({ id: parentId });
    if (!parent) throw new BadRequestException('Parent not found');

    const newTree = this.treeRepository.create({ label, parent });
    return this.treeRepository.save(newTree);
  }
}
