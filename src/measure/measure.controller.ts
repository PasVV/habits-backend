import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Measure } from './measure.entity';
import { MeasuresService } from './measure.service';

@Controller('measures')
export class MeasuresController {
  constructor(private measuresService: MeasuresService) {}

  @Get()
  index(): Promise<Measure[]> {
    return this.measuresService.findAll();
  }

  @Post('create')
  async create(@Body() measureData: Measure): Promise<any> {
    return this.measuresService.create(measureData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() measureData: Measure): Promise<any> {
    measureData.id = Number(id);
    console.log('Update #' + measureData.id);
    return this.measuresService.update(measureData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.measuresService.delete(id);
  }
}
