import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
  Ip,
  Patch,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { GuestCreateUrlDto, CreateUrlDto } from './dto/create-url.dto';
import { Public } from 'src/core/decorators/public.decorator';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { UrlPipe } from 'src/core/pipes/url.pipe';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Public()
  @Post('guest/urls')
  createGuestUrl(@Body() guestCreateUrlDto: GuestCreateUrlDto) {
    return this.urlsService.createGuestUrl(guestCreateUrlDto);
  }

  @Post('urls')
  create(
    @Body() createUrlDto: CreateUrlDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.urlsService.create(createUrlDto, user);
  }

  @Public()
  @Get('urls')
  visit(
    @Query('destinationUrl', UrlPipe) destinationUrl: string,
    @Ip() ip: string,
  ) {
    return this.urlsService.visit(destinationUrl, ip);
  }

  @Get('me/urls')
  findMyUrls(
    @CurrentUser() user: ICurrentUser,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.urlsService.findMyUrls(user, page, limit);
  }

  @Delete('urls/:id')
  remove(@CurrentUser() user: ICurrentUser, @Param('id') id: number) {
    return this.urlsService.remove(user, id);
  }

  @Roles('admin')
  @Delete('admin/urls/:id')
  removeWithAdminRole(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: number,
  ) {
    return this.urlsService.removeWithAdminRole(user, id);
  }

  @Roles('admin')
  @Patch('admin/urls/:id')
  connectAdvertisement(
    @Param('id') id: number,
    @Body('advertisementId') advertisementId: number,
  ) {
    return this.urlsService.connectAdvertisement(id, advertisementId);
  }

  @Roles('admin')
  @Get('admin/urls')
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.urlsService.findAll(page, limit);
  }
}
