import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Habit } from './habit.entity';
import { HabitsService } from './habit.service';
import { parseToken } from '../auth/auth.guard';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  index(): Promise<Habit[]> {
    return this.habitsService.findAll();
  }

  @Post('create')
  async create(
    @Body() habitData: Habit,
    @Req() request: Request,
  ): Promise<any> {
    const { id } = parseToken(request);

    return this.habitsService.create({ ...habitData, user: id }).catch((e) => {
      return new HttpException(
        {
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() habitData: Habit): Promise<any> {
    habitData.id = Number(id);
    console.log('Update #' + habitData.id);
    return this.habitsService.update(habitData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.habitsService.delete(id);
  }
}
