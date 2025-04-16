import { Test, TestingModule } from '@nestjs/testing';
import { TreeService } from './tree.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tree } from './tree.entity';
import { Repository } from 'typeorm';
import { CreateTreeDto } from './dto/create-tree.dto';

describe('TreeService', () => {
  let service: TreeService;
  let repository: Repository<Tree>;
  const mockTree: Tree = {
    id: 1,
    label: 'Test',
    children: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreeService,
        {
          provide: getRepositoryToken(Tree),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TreeService>(TreeService);
    repository = module.get<Repository<Tree>>(getRepositoryToken(Tree));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tree with label and optional parent', async () => {
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(mockTree);
    const createSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue({ label: 'Test' } as Tree);

    const result = await service.createTree({
      label: 'Test',
    } as CreateTreeDto);

    expect(createSpy).toHaveBeenCalledWith({ label: 'Test' });
    expect(saveSpy).toHaveBeenCalled();
    expect(result.label).toBe('Test');
  });
});
