import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Measure } from '../measure/measure.entity';
import { Habit } from '../habit/habit.entity';
import { users, measures, habits } from './mocks';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Measure)
    private measureRepository: Repository<Measure>,
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {
    this.seed();
  }

  async seed() {
    await this.userRepository.save(users);
    await this.measureRepository.save(measures);
    await this.habitRepository.save(habits);
  }
}
