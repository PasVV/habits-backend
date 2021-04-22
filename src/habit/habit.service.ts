import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Habit } from './habit.entity';
import { User } from '../user/user.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Habit[]> {
    return await this.habitRepository.find({ relations: ['measure', 'user'] });
  }

  async create(habit: Habit): Promise<Habit> {
    const parsedDate = new Date(habit.dateTo);

    if (
      !(parsedDate instanceof Date) ||
      isNaN((parsedDate as unknown) as number)
    ) {
      throw new Error(
        'Не удалось распарсить дату окончания. Ожидается Date() совместимая строка (ISO).',
      );
    }

    habit.dateTo = parsedDate.getTime();

    return await this.habitRepository.save(habit);
  }

  async update(habit: Habit): Promise<UpdateResult> {
    return await this.habitRepository.update(habit.id, habit);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.habitRepository.delete(id);
  }
}
