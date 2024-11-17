import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseInitializerService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    const db = this.connection.useDb(process.env.MONGO_DATABASE);
    const collections = await db.db.listCollections().toArray();
    if (!collections.some((col) => col.name === 'translations')) {
      await db.createCollection('translations');
    }
  }
}
