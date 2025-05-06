import { BadRequestException, Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/user.dto'; 
import { User } from '../../schema/user.schema';

@Controller('users')//decorators jo @ lagate hai usko bolte hai 
export class UserController {
  constructor(private readonly userService: UserService) {}  // Inject UserService here

  @Post('create-user')
  // @HttpCode(203)  // Set the response status code to 203 OK
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    if(!createUserDto) {
      console.error('createUserDto is undefined or null');
      throw new BadRequestException({message: "createUserDto is undefined or null"});
    }

    console.log('createUserDto:', createUserDto);  // Log the DTO for debugging
    return await this.userService.create(createUserDto);
  }

  @Get('get-Allusers')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
