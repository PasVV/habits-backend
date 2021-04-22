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
} from '@nestjs/common';
import { Habit } from './habit.entity';
import { HabitsService } from './habit.service';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  index(): Promise<Habit[]> {
    return this.habitsService.findAll();
  }

  @Post('create')
  async create(@Body() habitData: Habit): Promise<any> {
    return this.habitsService.create(habitData).catch((e) => {
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
