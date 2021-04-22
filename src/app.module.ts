import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HabitModule } from './habit/habit.module';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/database.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    HabitModule,
    MeasureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
