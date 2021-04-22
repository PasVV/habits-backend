import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Measure } from './measure.entity';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectRepository(Measure)
    private measureRepository: Repository<Measure>,
  ) {}

  async findAll(): Promise<Measure[]> {
    return await this.measureRepository.find();
  }

  async create(measure: Measure): Promise<Measure> {
    return await this.measureRepository.save(measure);
  }

  async update(measure: Measure): Promise<UpdateResult> {
    return await this.measureRepository.update(measure.id, measure);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.measureRepository.delete(id);
  }
}
