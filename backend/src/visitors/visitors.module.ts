import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';
import { VisitorsRepository } from './repositories/visitors.repository';
import { VisitorsController } from './visitors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])],
  providers: [VisitorsService, VisitorsRepository],
  controllers: [VisitorsController],
  exports: [VisitorsService],
})
export class VisitorsModule {}
