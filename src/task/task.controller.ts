import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  index(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post('create')
  async create(@Body() taskData: Task): Promise<any> {
    return this.tasksService.create(taskData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() taskData: Task): Promise<any> {
    taskData.id = Number(id);
    console.log('Update #' + taskData.id);
    return this.tasksService.update(taskData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.tasksService.delete(id);
  }
}
