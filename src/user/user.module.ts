import { Module, OnModuleInit} from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { User, UserSchema } from '../../schema/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    const db = this.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    console.log('Connected to MongoDB:', db.databaseName);

    // Check if collection exists
    const collections = await db.listCollections({ name: 'users' }).toArray();
    
    //Drop collection if it exists
    if (collections.length > 0) {
      await db.collection('users').drop();
      console.log('Dropped existing users collection');
    }


    // if (collections.length === 0) {
    //     console.log('Creating users collection for the first time');
    //   await db.createCollection('users');
    // } else {
    //   console.log('Users collection already exists');
    // }
    

    //Create collection with TTL index
    await db.createCollection('users');
    console.log('Collection "users" created');

    // Add TTL index for auto-deletion after 2 minutes
    await db.collection('users').createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 120 } // 2 minutes
    );
    console.log('TTL index added - documents will expire after 2 minutes');
  }
}