import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habit.entity';
import { HabitsService } from './habit.service';
import { HabitsController } from './habit.controller';
import { Measure } from '../measure/measure.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, Measure, User])],
  providers: [HabitsService],
  controllers: [HabitsController],
})
export class HabitModule {}
