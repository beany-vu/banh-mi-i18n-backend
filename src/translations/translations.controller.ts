import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { TranslationsService } from './translations.service';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {
    console.log(translationsService);
  }

  @Get()
  async index() {
    // show all translations
    return this.translationsService.findAll();
  }

  @Post()
  async createTranslation(
    @Body('creatorId') creatorId: number,
    @Body('name') name: string,
    @Body('locale') locale: string,
    @Body('data') data: any[],
  ) {
    const lastUpdatedTime = new Date().toString();

    return this.translationsService.create(
      creatorId,
      name,
      locale || 'en',
      data,
      lastUpdatedTime,
    );
  }

  @Put()
  async updateTranslation(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('locale') locale: string,
    @Body('data') data: any[],
  ) {
    const lastUpdatedTime = new Date().toString();
    console.log('update', id, name, locale, data, lastUpdatedTime);

    return this.translationsService.update(
      id,
      name,
      locale || 'en',
      data,
      lastUpdatedTime,
    );
  }
}
