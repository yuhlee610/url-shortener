import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { StringUtil } from 'src/core/utils/strings.util';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;

    return this.usersRepository.createUser(user);
  }

  findOneByEmailAndPassword(loginUserDto: LoginUserDto) {
    const user = new User();
    user.email = loginUserDto.email;
    user.password = loginUserDto.password;
    return this.usersRepository.findUserByEmailAndPassword(user);
  }

  updateRefreshToken(id: number, refreshToken: string) {
    return this.usersRepository.updateUserRefreshToken(id, refreshToken);
  }

  findOneByRefreshToken(refreshToken: string) {
    return this.usersRepository.findUserByRefreshToken(refreshToken);
  }

  async findAll(page: number, limit: number) {
    const [users, total] = await this.usersRepository.findUsersAndCount(
      page,
      limit,
    );

    return {
      users,
      metadata: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  remove(id: number) {
    return this.usersRepository.softDeleteUser(id);
  }

  updatePassword(
    currentUser: ICurrentUser,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersRepository.updatePassword(
      currentUser.id,
      StringUtil.encryptSHA256(updateUserPasswordDto.password),
      StringUtil.encryptSHA256(updateUserPasswordDto.newPassword),
    );
  }
}
