import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get('admin/users')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usersService.findAll(page, limit);
  }

  @Roles('admin')
  @Delete('users/:id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Patch('users')
  updatePassword(
    @CurrentUser() user: ICurrentUser,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(user, updateUserPasswordDto);
  }
}
