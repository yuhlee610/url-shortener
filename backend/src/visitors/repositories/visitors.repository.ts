import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from '../entities/visitor.entity';
import { Repository } from 'typeorm';
import { IVisitorsRepository } from '../interfaces/visitors-repository.interface';
import { StatisticDto } from '../dto/statistic.dto';

@Injectable()
export class VisitorsRepository implements IVisitorsRepository {
  constructor(
    @InjectRepository(Visitor)
    private visitorsRepository: Repository<Visitor>,
  ) {}

  createVisitor(visitor: Visitor): Promise<Visitor> {
    return this.visitorsRepository.save(visitor);
  }

  findStatisticsByDate(
    urlId: number,
    from: Date,
    to: Date,
  ): Promise<StatisticDto[]> {
    return this.visitorsRepository
      .createQueryBuilder('visitor')
      .select('DATE(visitor.createdAt)', 'date')
      .addSelect('COUNT(*)', 'visitCount')
      .where('visitor.urlId = :urlId', { urlId })
      .andWhere('visitor.createdAt BETWEEN :from AND :to', { from, to })
      .groupBy('DATE(visitor.createdAt)')
      .orderBy('date', 'DESC')
      .getRawMany();
  }

  findStatisticsByMonth(
    urlId: number,
    from: Date,
    to: Date,
  ): Promise<StatisticDto[]> {
    return this.visitorsRepository
      .createQueryBuilder('visitor')
      .select('DATE_FORMAT(visitor.createdAt, "%Y-%m")', 'date')
      .addSelect('COUNT(*)', 'visitCount')
      .where('visitor.urlId = :urlId', { urlId })
      .andWhere('visitor.createdAt BETWEEN :from AND :to', { from, to })
      .groupBy('DATE_FORMAT(visitor.createdAt, "%Y-%m")')
      .orderBy('date', 'DESC')
      .getRawMany();
  }

  findStatisticsByUser(userId: number): Promise<StatisticDto[]> {
    return this.visitorsRepository
      .createQueryBuilder('visitors')
      .select('DATE(visitors.createdAt)', 'date')
      .addSelect('COUNT(*)', 'visitCount')
      .innerJoin('URLs', 'urls', 'urls.id = visitors.urlId')
      .where('urls.createdById = :createdById', { createdById: userId })
      .groupBy('DATE(visitors.createdAt)')
      .getRawMany();
  }
}
