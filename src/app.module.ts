import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mysalesdb'), // Adjust the connection string as needed
    UserModule,
    SalesModule, // Import UserModule here
  ],
  controllers: [AppController], // Remove UserController from here
  providers: [AppService],
})
export class AppModule {}
