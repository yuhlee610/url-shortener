import { Injectable } from '@nestjs/common';
import { IUrlsRepository } from '../interfaces/urls-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Url } from '../entities/url.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UrlsRepository implements IUrlsRepository {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
    private dataSource: DataSource,
  ) {}

  createUrl(url: Url): Promise<Url> {
    return this.urlsRepository.save(url);
  }

  findUrlById(id: number): Promise<Url> {
    return this.urlsRepository.findOneBy({ id, deletedAt: null });
  }

  updateDestinationUrl(
    id: number,
    destinationUrl: string,
  ): Promise<UpdateResult> {
    return this.urlsRepository.update(
      {
        id,
      },
      { destinationUrl },
    );
  }

  findUrlByDestinationUrl(destinationUrl: string): Promise<Url> {
    return this.urlsRepository.findOneBy({ destinationUrl, deletedAt: null });
  }

  findUserUrlsAndCount(
    user: User,
    page: number,
    limit: number,
  ): Promise<[Url[], number]> {
    return this.urlsRepository.findAndCount({
      where: { createdBy: user, deletedAt: null },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  findAllUrlsAndCount(page: number, limit: number): Promise<[Url[], number]> {
    return this.urlsRepository.findAndCount({
      where: { deletedAt: null },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async softDeleteUrl(id: number, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.softDelete(Url, id);
      await queryRunner.manager.update(Url, id, { deletedBy: user });

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async isMyUrl(id: number, user: User): Promise<boolean> {
    const url = await this.urlsRepository.findOneBy({
      id,
      createdBy: user,
      deletedAt: null,
    });
    return !!url;
  }

  connectAdvertisement(id: number, advertisementId: number) {
    return this.dataSource
      .createQueryBuilder()
      .update(Url)
      .set({
        advertisement: { id: advertisementId },
      })
      .where('id = :id AND deletedAt IS NULL', { id })
      .execute();
  }
}
