import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { UrlsRepository } from './repositories/urls.repository';
import { VisitorsModule } from 'src/visitors/visitors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), VisitorsModule],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsRepository],
})
export class UrlsModule {}
