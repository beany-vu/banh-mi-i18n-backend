import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translations, TranslationsDocument } from './translations.schema';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectModel(Translations.name)
    private translationModel: Model<TranslationsDocument>,
  ) {}

  async create(
    creatorId: number,
    name: string,
    locale: string,
    data: any[],
    lastUpdatedTime: string,
  ): Promise<Translations> {
    const translation = new this.translationModel({
      creatorId,
      name,
      locale,
      data,
      lastUpdatedTime,
    });
    return translation.save();
  }

  async findAll(): Promise<Translations[]> {
    return this.translationModel.find().exec();
  }

  async findByCreatorId(creatorId: number): Promise<Translations[]> {
    return this.translationModel.find({ creatorId }).exec();
  }

  async findById(id: string): Promise<Translations> {
    return this.translationModel.findById(id).exec();
  }

  async update(
    id: string,
    name: string,
    locale: string,
    data: any[],
    lastUpdatedTime: string,
  ): Promise<Translations> {
    // console.log('update', id, name, locale, data, lastUpdatedTime);
    // Find the existing translation
    const translation = (await this.translationModel.findById(
      id,
    )) as TranslationsDocument;
    if (!translation) {
      throw new Error('Translation not found');
    }

    console.log({ translation });

    // Update the fields
    translation.name = name;
    translation.locale = locale;
    translation.lastUpdatedTime = new Date(lastUpdatedTime);

    // Update the data array
    data.forEach((newData) => {
      const index = translation.data.findIndex((d) => d.id === newData.id);
      if (index !== -1) {
        translation.data[index] = newData;
      } else {
        translation.data.push(newData);
      }
    });

    return translation.save();
  }
}
