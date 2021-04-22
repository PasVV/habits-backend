import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
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
}
