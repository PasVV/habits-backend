import { DeepPartial } from 'typeorm';
import { User } from '../user/user.entity';
import { Measure } from '../measure/measure.entity';
import { Habit } from '../habit/habit.entity';

export const users: DeepPartial<User>[] = [
  {
    name: 'John Doe',
    email: 'john.doe@habits.foo',
    password: '1q2w3e4r',
  },
  {
    name: 'Mark Thompson',
    email: 'mark.thompson@habits.foo',
    password: '1q2w3e4r',
  },
];

export const measures: DeepPartial<Measure>[] = [
  {
    fullName: 'раз',
    shortName: 'р.',
  },
  {
    fullName: 'метров',
    shortName: 'м.',
  },
  {
    fullName: 'километров',
    shortName: 'км.',
  },
  {
    fullName: 'секунд',
    shortName: 'с.',
  },
  {
    fullName: 'минут',
    shortName: 'мин.',
  },
  {
    fullName: 'часов',
    shortName: 'ч.',
  },
];

export const habits: DeepPartial<Habit>[] = [
  {
    user: 1,
    name: 'Отжиматься',
    description: 'Хочется за месяц достигнуть 30 отжиманий за подход.',
    type: 1,
    measure: 1,
    count: 10,
    increasePerStep: 1,
    increaseInterval: 1440,
    dateTo: new Date('2022-08-26T13:27:52.289Z'),
  },
  {
    user: 1,
    name: 'Чистить зубы 2 минуты',
    description: 'Хочу по таймеру чистить зубы.',
    type: 0,
    dateTo: new Date('2022-02-26T13:27:52.289Z'),
  },
  {
    user: 1,
    name: 'Ходить 5 км. в день',
    description:
      'Хочется увеличивая нагрузку начать дольше находиться на свежем воздухе',
    type: 1,
    measure: 2,
    count: 1000,
    increasePerStep: 500,
    increaseInterval: 4320,
    dateTo: new Date('2022-10-26T13:27:52.289Z'),
  },
];
