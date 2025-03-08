import { InjectRepository } from '@nestjs/typeorm';
import { IAdvertisementsRepository } from '../interfaces/advertisements-repository.interface';
import { Advertisement } from '../entities/advertisement.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';

export class AdvertisementsRepository implements IAdvertisementsRepository {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    private dataSource: DataSource,
  ) {}

  createAdvertisement(advertisement: Advertisement): Promise<Advertisement> {
    return this.advertisementsRepository.save(advertisement);
  }

  updateAdvertisement(advertisement: Advertisement): Promise<UpdateResult> {
    return this.advertisementsRepository.update(
      {
        id: advertisement.id,
      },
      advertisement,
    );
  }

  async softDeleteAdvertisement(id: number, currentUser: ICurrentUser) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.softDelete(Advertisement, id);
      await queryRunner.manager.update(Advertisement, id, {
        deletedBy: currentUser,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAdvertisementById(id: number): Promise<Advertisement> {
    return this.advertisementsRepository.findOneBy({ id });
  }

  findAllAdvertisementsAndCount(page: number, limit: number): Promise<[Advertisement[], number]> {
    return this.advertisementsRepository.findAndCount({
      where: { deletedAt: null },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
