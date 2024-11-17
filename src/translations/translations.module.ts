import { Module } from '@nestjs/common';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Translations, TranslationsSchema } from './translations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Translations.name, schema: TranslationsSchema },
    ]),
  ],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}
