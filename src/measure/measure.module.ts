import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './measure.entity';
import { MeasuresService } from './measure.service';
import { MeasuresController } from './measure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Measure])],
  providers: [MeasuresService],
  controllers: [MeasuresController],
})
export class MeasureModule {}
