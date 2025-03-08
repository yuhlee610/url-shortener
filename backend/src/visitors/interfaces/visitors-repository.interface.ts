import { StatisticDto } from '../dto/statistic.dto';
import { Visitor } from '../entities/visitor.entity';

export interface IVisitorsRepository {
  createVisitor(visitor: Visitor): Promise<Visitor>;
  findStatisticsByDate(
    urlId: number,
    from: Date,
    to: Date,
  ): Promise<StatisticDto[]>;
  findStatisticsByMonth(
    urlId: number,
    from: Date,
    to: Date,
  ): Promise<StatisticDto[]>;
  findStatisticsByUser(userId: number): Promise<StatisticDto[]>;
}
