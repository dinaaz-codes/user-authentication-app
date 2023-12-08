import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../config/swagger.config';

@ApiTags(API_TAGS.user)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'successfully created user ',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
