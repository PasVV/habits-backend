import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
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
  handleCron() {
    /**
     * TODO
     * 1. Реализовать алгоритм создания Task.
     * 2. Реализовать алгоритм автозавершения Task по истечению срока.
     * 3. Продумать авторизацию.
     */
    this.logger.debug('Called cron job.');
  }
}
