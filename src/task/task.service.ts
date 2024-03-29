import { Injectable, Logger } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Task } from './task.entity';
import { Habit } from '../habit/habit.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {
    setTimeout(() => {
      this.handleCron();
    }, 10000);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['habit'] });
  }

  async create(task: Task): Promise<Task> {
    if (!task.habit) {
      throw new Error('Не передан habit!');
    }

    return await this.taskRepository.save(task);
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepository.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const allTasksBefore = await this.taskRepository.find();
    const allHabits = await this.habitRepository.find();
    await this.taskRepository.remove(allTasksBefore);

    const newTasks = allHabits.map((habit) => ({
      done: false,
      habit: habit,
    }));

    await this.taskRepository.save(newTasks);

    this.logger.debug(`${newTasks.length} tasks was generated by cron job.`);
  }
}
