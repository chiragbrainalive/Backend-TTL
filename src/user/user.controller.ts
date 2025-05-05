import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/user.dto';  // Adjust the path if needed
import { User } from '../../schema/user.schema';

@Controller('vinod')//decorators jo @ lagate hai usko bolte hai 
export class UserController {
  constructor(private readonly userService: UserService) {}  // Inject UserService here

  @Post('create-user')
  async ravan(@Body() createUserDto: CreateUserDto): Promise<any> {
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
