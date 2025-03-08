import { UpdateResult } from 'typeorm';
import { Url } from '../entities/url.entity';
import { User } from 'src/users/entities/user.entity';

export interface IUrlsRepository {
  createUrl(url: Url): Promise<Url>;
  findUrlById(id: number): Promise<Url>;
  updateDestinationUrl(
    id: number,
    destinationUrl: string,
  ): Promise<UpdateResult>;
  findUrlByDestinationUrl(destinationUrl: string): Promise<Url>;
  findUserUrlsAndCount(
    user: User,
    page: number,
    limit: number,
  ): Promise<[Url[], number]>;
  findAllUrlsAndCount(page: number, limit: number): Promise<[Url[], number]>;
  softDeleteUrl(id: number, user: User): void;
  isMyUrl(id: number, user: User): Promise<boolean>;
  connectAdvertisement(
    id: number,
    advertisementId: number,
  ): Promise<UpdateResult>;
}
