import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Roles('admin')
  @Post()
  create(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() createAdvertisementDto: CreateAdvertisementDto,
  ) {
    return this.advertisementsService.create(
      createAdvertisementDto,
      currentUser,
    );
  }

  @Roles('admin')
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.advertisementsService.findAll(page, limit);
  }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.advertisementsService.findOne(id);
  }

  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.advertisementsService.update(
      id,
      updateAdvertisementDto,
      currentUser,
    );
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number, @CurrentUser() currentUser: ICurrentUser) {
    return this.advertisementsService.remove(id, currentUser);
  }
}
