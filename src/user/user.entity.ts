import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Habit } from '../habit/habit.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];
}
