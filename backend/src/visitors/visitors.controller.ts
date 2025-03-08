import { Controller, Get, Param, Query } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';

@Controller('statistics')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('type') type: 'date' | 'month'
  ) {
    if (type === 'month') {
      return this.visitorsService.findStatisticsByMonth(id, from, to);
    }
    return this.visitorsService.findStatisticsByDate(id, from, to);
  }

  @Get()
  findAll(@CurrentUser() currentUser: ICurrentUser) {
    return this.visitorsService.findStatisticsByUser(currentUser);
  }
}
