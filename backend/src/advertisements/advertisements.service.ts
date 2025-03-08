import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { Advertisement } from './entities/advertisement.entity';
import { User } from 'src/users/entities/user.entity';
import { AdvertisementsRepository } from './repositories/advertisements.repository';

@Injectable()
export class AdvertisementsService {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  create(
    createAdvertisementDto: CreateAdvertisementDto,
    currentUser: ICurrentUser,
  ) {
    const advertisement = new Advertisement(
      createAdvertisementDto.title,
      createAdvertisementDto.content,
      createAdvertisementDto.image,
    );
    advertisement.createdBy = User.apply(currentUser);

    return this.advertisementsRepository.createAdvertisement(advertisement);
  }

  async findAll(page: number, limit: number) {
    const [ads, total] =
      await this.advertisementsRepository.findAllAdvertisementsAndCount(
        page,
        limit,
      );

    return {
      advertisements: ads,
      metadata: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return this.advertisementsRepository.findAdvertisementById(id);
  }

  update(
    id: number,
    updateAdvertisementDto: UpdateAdvertisementDto,
    currentUser: ICurrentUser,
  ) {
    const advertisement = new Advertisement(
      updateAdvertisementDto.title,
      updateAdvertisementDto.content,
      updateAdvertisementDto.image,
    );
    advertisement.updatedBy = User.apply(currentUser);
    advertisement.id = id;

    return this.advertisementsRepository.updateAdvertisement(advertisement);
  }

  remove(id: number, currentUser: ICurrentUser) {
    return this.advertisementsRepository.softDeleteAdvertisement(
      id,
      currentUser,
    );
  }
}
