import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Measure } from '../measure/measure.entity';
import { User } from '../user/user.entity';
import { Habit } from '../habit/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, Measure, User])],
  providers: [SeederService],
})
export class SeederModule {}
