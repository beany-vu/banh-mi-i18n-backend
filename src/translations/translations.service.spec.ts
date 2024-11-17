/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslationsService } from './translations.service';
import { Translations, TranslationsSchema } from './translations.schema';

describe('TranslationsService', () => {
  let service: TranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // MongooseModule.forRoot('mongodb://localhost/nest'),
        MongooseModule.forFeature([{ name: Translations.name, schema: TranslationsSchema }], 'translations'),
      ],
      providers: [TranslationsService],
    }).compile();

    service = module.get<TranslationsService>(TranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
