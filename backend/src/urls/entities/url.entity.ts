import { Advertisement } from 'src/advertisements/entities/advertisement.entity';
import { User } from 'src/users/entities/user.entity';
import { Visitor } from 'src/visitors/entities/visitor.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('URLs')
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceUrl: string;

  @Column({
    nullable: true,
    unique: true,
  })
  destinationUrl: string;

  @OneToOne(() => Advertisement, { nullable: true })
  @JoinColumn()
  advertisement: Advertisement;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.createdUrls, { nullable: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedUrls, { nullable: true })
  updatedBy: User;

  @ManyToOne(() => User, (user) => user.deletedUrls, { nullable: true })
  deletedBy: User;

  @OneToMany(() => Visitor, (visitor) => visitor.url, { nullable: true })
  visitors: Visitor[];
}
