import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import {Habit} from "../habit/habit.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task, Habit])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}
