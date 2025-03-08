import { Advertisement } from 'src/advertisements/entities/advertisement.entity';
import { ICurrentUser } from 'src/core/interfaces/current-user.interface';
import { Url } from 'src/urls/entities/url.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => Url, (url) => url.createdBy)
  createdUrls: Url[];

  @OneToMany(() => Url, (url) => url.updatedBy)
  updatedUrls: Url[];

  @OneToMany(() => Url, (url) => url.deletedBy)
  deletedUrls: Url[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.createdBy)
  createdAds: Advertisement[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.updatedBy)
  updatedAds: Advertisement[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.deletedBy)
  deletedAds: Advertisement[];

  static apply(currentUser: ICurrentUser) {
    const user = new User();
    user.id = currentUser.id;
    user.email = currentUser.email;
    user.name = currentUser.name;
    user.role = currentUser.role;

    return user;
  }
}
