import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Habit } from '../habit/habit.entity';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  shortName: string;

  @OneToMany(() => Habit, (habit) => habit.measure)
  habits: Habit[];
}
