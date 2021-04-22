import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('create')
  async create(@Body() userData: User): Promise<any> {
    return this.usersService.create(userData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() userData: User): Promise<any> {
    userData.id = Number(id);
    console.log('Update #' + userData.id);
    return this.usersService.update(userData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.usersService.delete(id);
  }
}
