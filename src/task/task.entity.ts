import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Habit } from '../habit/habit.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  done: boolean;

  @Column({ nullable: true })
  donePercent: number;

  @Column()
  completeDate: Date;

  @ManyToOne(() => Habit)
  habit: Habit;
}
