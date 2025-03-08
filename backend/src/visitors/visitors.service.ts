import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorsRepository } from './repositories/visitors.repository';
import { Visitor } from './entities/visitor.entity';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { StatisticDto } from './dto/statistic.dto';
import { isSameDate, isSameMonth } from 'src/core/utils/dates.utils';

@Injectable()
export class VisitorsService {
  constructor(private visitorsRepository: VisitorsRepository) {}

  async create(createVisitorDto: CreateVisitorDto) {
    const visitor = new Visitor();
    visitor.ipAddress = createVisitorDto.ipAddress;
    visitor.url = createVisitorDto.url;

    return this.visitorsRepository.createVisitor(visitor);
  }

  async findStatisticsByDate(urlId: number, from: Date, to: Date) {
    const data = await this.visitorsRepository.findStatisticsByDate(
      urlId,
      from,
      to,
    );

    return {
      statistics: this.normaliseDateStatistics(data, from, to),
    };
  }

  async findStatisticsByMonth(urlId: number, from: Date, to: Date) {
    const data = await this.visitorsRepository.findStatisticsByMonth(
      urlId,
      from,
      to,
    );

    return {
      statistics: this.normaliseMonthStatistics(data, from, to),
    };
  }

  async findStatisticsByUser(currentUser: ICurrentUser) {
    const data = await this.visitorsRepository.findStatisticsByUser(
      currentUser.id,
    );
    return {
      statistics: data,
    };
  }

  normaliseDateStatistics(data: StatisticDto[], from: Date, to: Date): StatisticDto[] {
    const statistics: StatisticDto[] = [];
    let currentDate = new Date(from);

    while (currentDate <= new Date(to)) {
      const stat = data.find((item) => isSameDate(item.date, currentDate));

      statistics.push({
        date: new Date(currentDate),
        visitCount: stat ? +stat.visitCount : 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return statistics;
  }

  normaliseMonthStatistics(data: StatisticDto[], from: Date, to: Date): StatisticDto[] {
    const statistics: StatisticDto[] = [];
    let currentDate = new Date(from);

    while (currentDate <= new Date(to)) {
      const stat = data.find((item) => isSameMonth(item.date, currentDate));

      statistics.push({
        date: new Date(currentDate),
        visitCount: stat ? +stat.visitCount : 0,
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return statistics;
  }
}
