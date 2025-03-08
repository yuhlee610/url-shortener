import { BadRequestException, Injectable } from '@nestjs/common';
import { GuestCreateUrlDto, CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlsRepository } from './repositories/urls.repository';
import { Url } from './entities/url.entity';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { VisitorsService } from 'src/visitors/visitors.service';
import { StringUtil } from 'src/core/utils/strings.util';

@Injectable()
export class UrlsService {
  constructor(
    private urlsRepository: UrlsRepository,
    private configService: ConfigService,
    private visitorService: VisitorsService,
  ) {}

  async createGuestUrl(guestCreateUrlDto: GuestCreateUrlDto) {
    const url = new Url();
    url.sourceUrl = guestCreateUrlDto.sourceUrl;

    const dbUrl = await this.urlsRepository.createUrl(url);
    const shortUrl = StringUtil.buildShortUrl(
      dbUrl.id,
      dbUrl.sourceUrl,
      this.configService.get('MY_DOMAIN'),
    );
    await this.urlsRepository.updateDestinationUrl(dbUrl.id, shortUrl);
    url.destinationUrl = shortUrl;

    return url;
  }

  async create(createUrlDto: CreateUrlDto, currentUser: ICurrentUser) {
    const existingUrl = await this.urlsRepository.findUrlByDestinationUrl(
      createUrlDto.destinationUrl,
    );
    if (existingUrl)
      throw new BadRequestException('Destination URL already exists');

    const url = new Url();
    url.sourceUrl = createUrlDto.sourceUrl;
    url.destinationUrl = createUrlDto.destinationUrl;
    url.createdBy = User.apply(currentUser);

    return this.urlsRepository.createUrl(url);
  }

  async findAll(page: number, limit: number) {
    const [urls, total] = await this.urlsRepository.findAllUrlsAndCount(
      page,
      limit,
    );

    return {
      urls,
      metadata: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findMyUrls(user: ICurrentUser, page: number, limit: number) {
    const [urls, total] = await this.urlsRepository.findUserUrlsAndCount(
      User.apply(user),
      page,
      limit,
    );

    return {
      urls,
      metadata: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async visit(destinationUrl: string, ip: string) {
    const url =
      await this.urlsRepository.findUrlByDestinationUrl(destinationUrl);

    if (!url) throw new BadRequestException('URL not found');
    await this.visitorService.create({
      url,
      ipAddress: ip,
    });
    return url;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  async remove(user: ICurrentUser, id: number) {
    const isMyUrl = await this.urlsRepository.isMyUrl(id, User.apply(user));
    if (!isMyUrl) {
      throw new BadRequestException('You are not allowed to delete this URL');
    }
    return this.urlsRepository.softDeleteUrl(id, User.apply(user));
  }

  async removeWithAdminRole(user: ICurrentUser, id: number) {
    return this.urlsRepository.softDeleteUrl(id, User.apply(user));
  }

  async connectAdvertisement(id: number, advertisementId: number) {
    return this.urlsRepository.connectAdvertisement(id, advertisementId);
  }
}
