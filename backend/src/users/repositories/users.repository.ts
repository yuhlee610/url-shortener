import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsersRepository } from '../interfaces/users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findUserByEmailAndPassword(user: User) {
    return this.usersRepository.findOneBy({
      email: user.email,
      password: user.password,
    });
  }

  createUser(user: User) {
    return this.usersRepository.save(user);
  }

  updateUserRefreshToken(id: number, refreshToken: string) {
    return this.usersRepository.update(id, { refreshToken });
  }

  findUserByRefreshToken(refreshToken: string) {
    return this.usersRepository.findOneBy({ refreshToken });
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findUsersAndCount(page: number, limit: number) {
    return this.usersRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  softDeleteUser(id: number) {
    return this.usersRepository.softDelete(id);
  }

  updatePassword(id: number, password: string, newHashPassword: string) {
    return this.usersRepository.update(
      { id, password },
      { password: newHashPassword },
    );
  }
}
