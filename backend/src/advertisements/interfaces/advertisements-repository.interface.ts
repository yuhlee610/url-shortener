import { UpdateResult } from "typeorm";
import { Advertisement } from "../entities/advertisement.entity";
import { ICurrentUser } from "src/core/interfaces/current-user.interface";

export interface IAdvertisementsRepository {
  createAdvertisement(advertisement: Advertisement): Promise<Advertisement>;
  updateAdvertisement(advertisement: Advertisement): Promise<UpdateResult>;
  softDeleteAdvertisement(id: number, currentUser: ICurrentUser): Promise<void>;
  findAdvertisementById(id: number): Promise<Advertisement>;
  findAllAdvertisementsAndCount(page: number, limit: number): Promise<[Advertisement[], number]>;
}