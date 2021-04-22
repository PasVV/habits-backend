import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Measure } from '../measure/measure.entity';

enum HabitType {
  Common,
  WithProgress,
}

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  type: HabitType;

  @Column({ nullable: true, default: false })
  count: number;

  @Column({ nullable: true, default: false })
  increasePerStep: number;

  @Column({ nullable: true, default: false })
  increaseInterval: number; // in minutes

  @Column({ nullable: false })
  dateTo: number; // UNIX timestamp

  @ManyToOne(() => Measure, (measure) => measure.habits)
  measure: Measure;

  @ManyToOne(() => User, (user) => user.habits)
  user: User;
}
