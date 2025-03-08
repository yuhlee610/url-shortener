import { Url } from 'src/urls/entities/url.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Advertisements')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Url, (url) => url.advertisement, { nullable: true })
  urls: Url[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.createdAds, { nullable: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedAds, { nullable: true })
  updatedBy: User;

  @ManyToOne(() => User, (user) => user.deletedAds, { nullable: true })
  deletedBy: User;

  constructor(title: string, content: string, image: string) {
    this.title = title;
    this.content = content;
    this.image = image;
  }
}
