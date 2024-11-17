import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

describe('TranslationsController', () => {
  let controller: TranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [
        {
          provide: TranslationsService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              creatorId: 1,
              name: 'Test Translation',
              data: [],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<TranslationsController>(TranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a translation', async () => {
    const result = await controller.createTranslation(1, 'Test Translation', []);
    expect(result).toEqual({
      creatorId: 1,
      name: 'Test Translation',
      data: [],
    });
  });
});
