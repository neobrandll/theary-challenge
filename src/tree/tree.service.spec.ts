import { Test, TestingModule } from '@nestjs/testing';
import { TreeService } from './tree.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tree } from './tree.entity';
import { Repository } from 'typeorm';
import { CreateTreeDto } from './dto/create-tree.dto';

describe('TreeService', () => {
  let service: TreeService;
  let repository: jest.Mocked<Repository<Tree>>;
  const mockTree: Tree = {
    id: 1,
    label: 'Test',
    children: [],
  };

  const mockChild: Tree = {
    id: 2,
    label: 'Child',
    children: [],
    parent: mockTree,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreeService,
        {
          provide: getRepositoryToken(Tree),
          useValue: {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TreeService>(TreeService);
    repository = module.get(getRepositoryToken(Tree));
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

  it('should create a tree with a parent', async () => {
    const createSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(mockChild as Tree);

    repository.findOneBy.mockResolvedValue(mockTree);

    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(mockChild);

    const childResult = await service.createTree({
      label: 'Child',
      parentId: 1,
    });

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(createSpy).toHaveBeenCalledWith({
      label: 'Child',
      parent: mockTree,
    });
    expect(saveSpy).toHaveBeenCalled();
    expect(childResult.label).toBe('Child');
    expect(childResult.parent).toEqual(mockTree);
  });

  it('should fail if parent is not found', async () => {
    await expect(
      service.createTree({
        label: 'Child',
        parentId: 1,
      }),
    ).rejects.toMatchObject({
      name: 'BadRequestException',
      message: 'Parent not found',
    });

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
});
