import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TranslationsDocument = Translations & Document;

@Schema()
export class Translations {
  @Prop({ required: true })
  creatorId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastUpdatedTime: Date;

  @Prop({ required: true })
  locale: string;

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        defaultMessage: { type: String, required: true },
        message: { type: String, required: false },
        description: { type: String, required: false },
      },
    ],
  })
  data: {
    id: string;
    defaultMessage: string;
    message?: string;
    description?: string;
  }[];
}

export const TranslationsSchema = SchemaFactory.createForClass(Translations);
