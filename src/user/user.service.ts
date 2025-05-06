import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../../schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log('Creating user:', createUserDto);
      
      const createdUser = new this.userModel({
        shirt: createUserDto.shirt,
        pant: createUserDto.pant,
        shoes: createUserDto.shoes, 
        phone: createUserDto.phone,
      });

      return await createdUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
